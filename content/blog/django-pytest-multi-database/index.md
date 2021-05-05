---
date: "2021-05-05T15:00:00Z"
description: "Adding multi-database rollback support to pytest-django using fixtures that patch Django's test classes."
featuredImage: "vincent-van-zalinge-4Mu2bXIsn5Y-unsplash.jpg"
featuredImageCredit: "Vincent van Zalinge"
featuredImageLink: "https://unsplash.com/photos/4Mu2bXIsn5Y"
tags: ["django", "database", "oracle", "oracle database", "pytest"]
title: "Rollback Multiple Test Databases in Django with Pytest"
---

# What's the problem?

[Django](https://www.djangoproject.com/), [pytest](https://docs.pytest.org/), and [pytest-django](https://pytest-django.readthedocs.io/en/latest/) are awesome and work very well together when you have a single database and/or use a single, temporary test database that is created and destroyed every test run.

If you have multiple (test) databases that persist before/after test runs you may find that your test data remains for all databases that aren't named "default".

This can lead to all sorts of issues with tests and isn't great when you have shared test databases.

# pytest-django doesn't support multi-db rollback

When setting up the database fixtures (`db`, `transactional_db`) pytest-django makes use of [`TransactionTestCase`](https://docs.djangoproject.com/en/3.2/topics/testing/tools/#transactiontestcase) or [`TestCase`](https://docs.djangoproject.com/en/3.2/topics/testing/tools/#testcase). Both of these use transactions under the hood and while they may also do things atomically the big difference is that one truncates all tables while the other resets state after each test.

The challenge in using these with pytest-django is that `TransactionTestCase` and `TestCase` are hard-coded to only work with the default database via `DEFAULT_DB_ALIAS` (_see this at <https://github.com/django/django/blob/main/django/test/testcases.py#L927>_).

Because of the hard-coded `DEFAULT_DB_ALIAS` any database that isn't the default won't have rollback and will persist any changes made during tests.

**This is less an issue with pytest-django and more an issue with hard-coded defaults in Django's test classes.** Django expects you to provide the DB names for test cases as-needed in a multi-database test setup (_see <https://docs.djangoproject.com/en/3.2/topics/testing/tools/#testing-multi-db>_) but because we aren't directly sub-classing test cases we can't specify our databases.

# Using pytest fixtures to patch Django's test classes

**The fix for this is pretty simple!** We're going to use a pytest fixture that'll patch Django's test classes to support all databases defined in Django's settings.

Assuming you already have pytest and pytest-django setup and working this is all you need to add to your base `conftest.py`:

```python
import pytest


@pytest.fixture(autouse=True, scope='session')
def django_db_multiple():
    """
    Ensure all test functions using Django test cases have
    multiple database rollback support.
    """
    from _pytest.monkeypatch import MonkeyPatch
    from django.conf import settings
    from django.test import TestCase
    from django.test import TransactionTestCase

    db_keys = set(settings.DATABASES.keys())

    monkeypatch = MonkeyPatch()
    monkeypatch.setattr(TestCase, 'databases', db_keys)
    monkeypatch.setattr(TransactionTestCase, 'databases', db_keys)

    yield monkeypatch

    monkeypatch.undo()
```

**All set!** You now have rollback support for all databases. You don't need to do anything else and can get back to writing tests. Any changes you make in your tests will be rolled back across all of your databases.

This works by replacing the hard-coded default `DEFAULT_DB_ALIAS` with the database names defined in your settings. Because it's an `autouse`, session-scoped fixture in your base configuration it'll be run once automatically and persist for all tests.

# Other solutions and discussions

There isn't yet a concesus on how best to do this and there isn't yet an official solution. What we're using is based on comments and direction from contributors to pytest-django but there's always more than one way to do things.

For alternative solutions and more discussion:

* <https://github.com/pytest-dev/pytest-django/issues/76>
* <https://github.com/pytest-dev/pytest/issues/1872>

_Have a better way? Disagree? [Let us know](https://github.com/merit-network/merit-network.github.io/issues)!_
