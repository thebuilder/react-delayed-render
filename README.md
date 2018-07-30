## ⚠️ deprecated ⚠️
# react-delayed-render 

[![Greenkeeper badge](https://badges.greenkeeper.io/thebuilder/react-delayed-render.svg)](https://greenkeeper.io/)
<!-- Build Status -->
<a href="https://travis-ci.org/thebuilder/react-delayed-render">
  <img src="https://travis-ci.org/thebuilder/react-delayed-render.svg" alt="Build Status" />
</a>

Initialize server side rendered components when the app is ready.
This requires the server to output a custom script tag, that contains the components and data to render.

We are using this solution with [ReactJS.net](http://reactjs.net/), to enable partial caching of the React views.

```js
import delayedRender from './utils/delayed-render';

if (global._components && Array.isArray(global._components)) {
  delayedRender(global._components);
  global._components = null;
}
```

## delayedRender
`delayedRender(components: Array<ComponentDefinition>, lookup: Object = global)`

### ComponentDefinition 
* *name* - Component exposed to the to lookup object (global/window). This should be a string.
* *props* - The component props.
* *name* - Element `id` attribute.

## HTML
The server should output the `<script>` tag to initialize the components. This is an example from the implementation on [in2media.com](https://www.in2media.com).

```html
<body>
  <header id="react_3MrojQAS6kSdRQK6cnnCKQ">
    <nav data-reactroot="" data-reactid="1" data-react-checksum="-2030430549">...</nav>
  </header>
  <script>
     _components.push({
       name   : "Components.Header",
       props  : {
         "logo": {"company": "in2media"},
         "nav" : [
           {"href": "/about/", "label": "About", "active": false}, 
           {"href": "/our-work/", "label": "Our Work", "active": false}, 
           {"href": "/jobs/", "label": "Jobs", "active": false}, 
           {"href": "/contact/", "label": "Contact", "active": false}
         ]
       },
       element: "react_3MrojQAS6kSdRQK6cnnCKQ"
     })
  </script>
</body>
```
