<script>
    import Icon from '../assets/icon.png';
    import ListImg from '../assets/list.png'
    import StatsImg from '../assets/stats.png'
    import UserImg from '../assets/profile.png'
</script>

<navbar>
    <img src={Icon} alt="Icon">
    <ul>
        <li><a href="../../"><img src={ListImg} alt="List"></a></li>
        <li><a href="../../stats/"><img src={StatsImg} alt="Stats"></a></li>
        <li><a href="../../user/"><img src={UserImg} alt="User"></a></li>
    </ul>
</navbar>

<style>
    navbar {
        width: 100%;
        display: flex;
        height: 6rem;
        padding: 0.5rem 2rem;
        align-items: center;
        justify-content: space-between;
    }

    navbar > img {
        height: 100%;
    }

    navbar ul {
        display: flex;
        height: 6rem;
        padding: 0.5rem;
        list-style: none;
        gap: 2rem;
        align-items: center;
    }

    navbar ul li img, navbar ul li {
        height: 90%;
        cursor: pointer;
    }

    @media screen and (max-width: 1440px) {
        navbar, navbar ul {
            height: 5rem;
        }
    }

    @media screen and (max-width: 1080px) {
        navbar, navbar ul {
            height: 4rem;
        }
    }
    
    @media screen and (orientation: portrait) {
        navbar {
            width: 100%;
            padding: 0;
        }

        navbar ul {
            width: 100%;
            gap: 1rem;
            justify-content: center;
            height: 100%;
            align-items: center;
            height: 100%;
        }

        navbar ul li {
            height: 80%;
        }

        navbar ul li img {
            height: 80%;
        }
    }
</style>