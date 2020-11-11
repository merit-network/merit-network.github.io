---
date: "2020-11-11T15:00:00Z"
description: "Using Django model method decorators to set field values using Oracle Database sequences or other SQL with multi-database support."
featuredImage: jon-tyson-UJN_XAg0ECI-unsplash.jpg
featuredImageCredit: "Jon Tyson"
featuredImageLink: "https://unsplash.com/photos/UJN_XAg0ECI"
tags: ["django", "oracle", "oracle database"]
title: Setting Django model fields automatically using Oracle Database sequences
---

_**Oracle Database not required!** The following will detail working with things like sequences in Oracle database but the decorator and general approach can be used in any database supported by Django._

# TL;DR

Use the `set_sql_for_field` decorator below on your model's `save()` method to get/set a sequence or any other arbitrary SQL.

# An imperfect database for an imperfect world

Sometimes when working with existing or legacy databases you might run into less-than-perfect implementations of things like primary keys.

Could be that when the database was created the database management system (DBMS) didn't support things like `AUTO_INCREMENT` (MySQL) or `IDENTITY` (Oracle Database 12+). It could also be that those responsible had good reason to manually manage things or maybe didn't know of a different way of doing things.

**Let's say for reasons beyond this blog post that you cannot alter the existing datbases/tables.**

# Generating Django models

We'll assume you've got your `DATABASES` setup correctly in Django's settings and want to generate a model for the following Oracle Database table:

```sql
-- example from: https://oracle-base.com/articles/misc/autonumber-and-identity

CREATE TABLE department (
  DEPARTMENT_ID NUMBER(10)    NOT NULL,
  DESCRIPTION   VARCHAR2(50)  NOT NULL);

ALTER TABLE department ADD (
  CONSTRAINT dept_pk PRIMARY KEY (ID));

CREATE SEQUENCE dept_seq;
```


To generate the Django model for this table:

```bash
python manage.py inspectdb department > department/models.py
```

You should have a model that looks like:

```python
# departments/models.py
from django.db import models

class Department(models.Model):
    department_id = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=50)

    class Meta:
        db_table = 'department'
        managed = False
```

We've got the necessary model code but we can't save our model without errors! We need to get the next sequence and use it as the `DEPARTMENT_ID` when creating a new department.

# Adding our Django model method decorator

Create/edit `models.py` in the root of your project/app and add:

```python
import functools

def set_sql_for_field(field, sql):
    """
    Decorator for Model.save() to set SQL for field if empty.

    Example:

    class LegacyModel(models.Model):
        col1 = models.IntegerField(primary_key=True)
        col2 = models.IntegerField()

        @set_sql_for_field('col1', 'select col1_seq.nextval from dual')
        @set_sql_for_field('col2', 'select 1+max(col2) from legacy_model')
        def save(self, *args, **kwargs):
            super().save(*args, **kwargs)

    When this model is saved col1 and col2 will be set (if empty) to the output
    of the provided SQL within the schema/database of the model's app.
    """
    def decorator(model_save_func):
        @functools.wraps(model_save_func)
        def wrapper(obj, *args, **kwargs):
            assert hasattr(obj, field), (
                'set_sql_for_field was given a field that does not exist on '
                'the model. Double-check model fields and decorators for '
                f'{obj.__class__}.{field} and SQL {sql}'
            )

            if getattr(obj, field) is None:
                # Multi-DB safe! Get DB for class from default manager.
                database = obj.__class__._default_manager.db

                from django.db import connections
                with connections[database].cursor() as cursor:
                    cursor.execute(f'{sql}')
                    setattr(obj, field, cursor.fetchone()[0])

            return model_save_func(obj, *args, **kwargs)
        return wrapper
    return decorator
```


Update the departments model to use our new decorator:

```python
# departments/models.py
from django.db import models
from myapp.models import set_sql_for_field

class Department(models.Model):
    department_id = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=50)

    class Meta:
        db_table = 'department'
        managed = False

    @set_sql_for_field('department_id', 'select dept_seq.nextval from dual')
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
```

**That's it!** Whenever we save our model the field `department_id` will be set using the next sequence from the database and it even works if we have multiple databases in our Django settings.


# What about triggers?

It's possible there is already a trigger on the table that will get/set the sequence when `NULL`:

```sql
-- example from: https://oracle-base.com/articles/misc/autonumber-and-identity
CREATE OR REPLACE TRIGGER dept_bir
BEFORE INSERT ON department
FOR EACH ROW
WHEN (new.department_id IS NULL)
BEGIN
  :new.department_id := dept_seq.NEXTVAL;
END;
/
```

That's awesome but it can also lead to some weird issues/errors in Django (e.g., admin showing "None" when saving). If the trigger is setup to check NULL no harm in setting it ourselves but you should always check triggers for any tables when setting up new models in Django.

# Advanced model method decorator usage

Let's say you have a table without a primary key and without `sequence`, `identity` or `auto_increment`:

```sql
CREATE TABLE dept_type (TYPE_KEY NUMBER(10), DESCR VARCHAR2(50));
```

You look at some of the code using it and see that the `TYPE_KEY` was being set using this SQL:

```sql
select 1+max(type_key) from dept_type;
```

Run `inspectdb` like we did above and add our new decorator to get the final model:

```python
# departments/models.py
from django.db import models
from myapp.models import set_sql_for_field

class DepartmentType(models.Model):
    type_key = models.IntegerField(primary_key=True)
    descr = models.CharField(max_length=50)

    class Meta:
        db_table = 'dept_type'
        managed = False

    @set_sql_for_field('type_key', 'select 1+max(type_key) from dept_type')
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
```

That's all there is to it. We set `primary_key` on the `type_key` field to tell Django not to use the automatic `id` field (see <https://docs.djangoproject.com/en/3.1/topics/db/models/#automatic-primary-key-fields>).

# Additional model/field considerations

Depending on your models you may want to set certain fields as read-only in the Django admin or Django REST Framework to avoid them being set directly:

```python
# departments/admin.py
from django.contrib import admin
from myapp.departments.models import DepartmentType

@admin.register(DepartmentType)
class DepartmentTypeAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'type_key', )
    readonly_fields = ('type_key', )
    search_fields = ('=type_key', 'descr', )


# departments/serializers.py
from rest_framework.serializers import ModelSerializer
from myapp.departments.models import DepartmentType

class DepartmentTypeSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = DepartmentType
        read_only_fields = ['type_key']
```

# Closing thoughts

**Whenever possible use primary keys and `AUTO_INCREMENT` or `IDENTITY`**. For the times you can't, hopefully something like `set_sql_for_field` can help!
