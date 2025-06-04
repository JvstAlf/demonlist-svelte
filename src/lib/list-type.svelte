<script>
    import MainList from '../assets/main-list.png'
    import ExtendedList from '../assets/extended-list.png'
    import LegacyList from '../assets/legacy-list.png'
</script>

<div>
    <img src={MainList} alt="Main List">
    <img src={ExtendedList} alt="Extended List">
    <img src={LegacyList} alt="Legacy List">
</div>

<style>
    div {
        width: 90%;
        padding: 0.25rem;
        height: 6rem;
        background-color: rgb(153, 85, 51);
        border: 1rem solid;
        border-image: url('../assets/brownbox.png') 10% round;
        display: flex;
        justify-content: space-evenly;
        background-clip: padding-box;
        margin-bottom: 2rem;
    }

    div img {
        height: 100%;
        cursor: pointer;
        transition: 0.1s;
    }

    div img:hover {
        scale: 1.05;
    }
</style>