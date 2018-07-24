## vue-webp-plugin

> make it easily to use webp format image, both src and backgrund-image support~

#### features
    1. base64格式的图片资源自动忽略webp
    2. both support src and background-image(allways use this to support background-image in stylesheet)
    3. auto use orginal format(e.g png, jpg ...) when the webp format loading failed.

### how to use
#### install vue-webp-plugin
```
npm install --save vue-webp-plugin
//or
yarn add vue-webp-plugin
```
#### use plugin to Vue
```
...
import WebpPlugun from 'vue-webp-plugin';
Vue.use(WebpPlugun);
```
#### in your component 

1. src方式使用远程图片
```
<img v-webp="'https://h5.u51.com/99fenqi/vue//static/home_top_bg.png'"/>
```
2. src方式使用本地图片
```
<img v-webp="'static/home_top_bg.png'"/>
```
3. use an variable
```

<img v-webp="url"/>
<script>
    export default {
        data() {
            return {
                url: 'static/home_top_bg.png'
            }
        }
    }
</script>
```

4. background-image方式使用
```
<div v-webp:bg="'static/home_top_bg.png'"></div>
```

#### tips
