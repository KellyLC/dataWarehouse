<template>
    <div class="page">
        <bar></bar>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
        Bar
    } from 'vue-chartjs'
    export default {
        data() {
            return {
            }
        },
        components: {
        },
        extends: Bar,
        mounted() {
            this.renderChart({
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'GitHub Commits',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                }]
            })
        }
    }
</script>

<style>

 
</style>
