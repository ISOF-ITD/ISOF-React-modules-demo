import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, Redirect } from 'react-router'

import Application from './components/Application';

// IE 11 backwards compatibility, Promise och Fetch
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
	window.Promise = Promise;
}

// Initalisera stöd för flerspråkighet
import Lang from './../ISOF-React-modules/lang/Lang';
window.Lang = Lang;
window.l = Lang.get;

// Initalisera React.js Router
ReactDOM.render(
	<Application />,
	document.getElementById('app')
);