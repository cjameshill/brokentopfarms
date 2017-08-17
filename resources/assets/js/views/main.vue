<template>
    <div class="container">
        <h1 class="title is-1">{{title}}</h1>
        <p>Welcome to the {{title}} test. Click a link:</p>

        <input type="text" class="input is-large" v-model="text">

        {{text}}

        <h1 class="title is-3">{{count}}</h1>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                text: '',
                title: 'Welcome'
            }
        },

        computed: {
            count() {
                return this.text.length;
            }
        }
    }
</script>

<style lang="css">

    .container {
        background: whitesmoke;
        margin: 3em;
        padding: 3em;
    }

    input {
        font-size: 2em;
    }

    h1, p {
        font-family: Helvetica, sans-serif;
    }

</style>
