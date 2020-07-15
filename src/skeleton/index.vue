<template>
    <div class="skeleton" id='index'>
        <!-- <p class='rey1'></p>
        <p class='rey2'></p>
        <p class='rey3'></p> -->
    </div>
</template>

<style>
.skeleton {
    padding: 10px;
}

.skeleton > p {
    background: rgb(194, 207, 214);   
    height: 30px;
    margin-bottom: 10px;
    transform-origin: left;
}
.rey1 {
    width: 80%;
     animation: skeleton-stretch 0.5s -0.3s linear infinite alternate;
}
.rey2 {
    width: 60%;
    animation: skeleton-stretch 0.5s -0s linear infinite alternate;
}
.rey3 {
    width: 40%;
    animation: skeleton-stretch 0.4s -0.2s linear infinite alternate;
}

/* .skeleton-title {
    animation: skeleton-stretch 0.5s linear infinite alternate;
} */

.skeleton-content {
    width: 260px;
    height: 30px;
    margin-top: 10px;
    transform-origin: left;
}

/* @keyframes skeleton-stretch {
    from {
        transform: scalex(1);
    }
    to {
        transform: scalex(0.3);
    }
} */
</style>
<script>
export default {};
</script>
