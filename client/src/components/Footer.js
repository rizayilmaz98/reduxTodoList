import React from 'react'

function Footer() {
  return (
    <footer className="info">
	    <p>Created by HTML CSS<a href="https://d12n.me/">Dmitry Sharabin</a></p>
	    <p>Created by React Redux Rıza Yılmaz</p>
	    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>

  )
}

export default React.memo(Footer) ;