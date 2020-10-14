import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ButtonIcon = ({href, icon}) => {
  return (
    <a href={href} className="button is-info is-inverted">
      <span className="icon">
        <FontAwesomeIcon icon={icon} size="lg" />
      </span>
    </a>
  )
}


export default ButtonIcon
