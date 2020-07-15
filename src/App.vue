<template>
    <div id="app">
        <transition :name="animation">
            <router-view class="page-container"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
   name:'App' ,
   data:function(){
       return{
           animation:"forward"
       }
   }
}
</script>

