# responsive-image-loader
A module for lazy loading and hot swapping responsive images

```
// EXAMPLE USAGE CALL:
 init({
     baseUrl: 'data-img-desktop', // will be used as largest, AND default if no other responsive tags are used
     responsive: [ // Array of breakpoint objects
         {
             breakpoint: 1024,
             url: 'data-img-tablet'
         },
         {
             breakpoint: 769,
             url: 'data-img-mobile'
         }
     ],
     lazyLoad: true
});
```
