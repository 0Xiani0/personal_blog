<template>
    <main>
        <aside>
            <h2>Админ панель</h2>
            <router-link to="/admin">Главная</router-link>
            <router-link to="/admin/posts">Посты</router-link>
            <router-link to="/admin/gallery">Галерея</router-link>
            <router-link to="/admin/users">Пользователи</router-link>
        </aside>
        <router-view/>
    </main>
</template>

<script>

</script>

<style scoped>
main {
    flex: 1 0 auto;
    display: flex;

    aside {
        width: 20%;
        padding: 16px;
        border-right: 1px solid #000000;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    img {
        max-width: 31%;
        object-fit: contain;
        margin: 1%;
    }
    a {
        padding: 4px 0;
    }

       
    
}
</style>