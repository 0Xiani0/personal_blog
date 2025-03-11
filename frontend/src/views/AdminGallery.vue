<template>
    <section>
        <article class="heading">
            <h2>Галерея</h2>
            <button aria-label="Добавить фотографию">Добавить</button>
        </article>
        <article>
            <img src="@/assets/images/photo_1.jpg" alt="1">
            <div>
                <p>Name: <b>Photo 1</b></p>
                <p>URL: <b>@/assets/images/photo_1.jpg</b></p>
            </div>
            <div>
                <button aria-label="Обновить">Обновить</button>
                <button aria-label="Удалить">Удалить</button>
            </div>
        </article>
    </section>
</template>

<script>

</script>

<style scoped>
section {
    width: 80%;
    display: flex;
    flex-direction: column;
}
h2 {
    margin: 16px;
}

article {
    max-height: 10%;
    margin: 4px 16px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
}
button {
    background-color: #f2e8fc;  
    color: #333;  
    font-weight: bold;  /* Жирный текст */
    font-size: 14px;  /* Размер шрифта */
    border: 1px solid #000000;  /* Цвет рамки */
    padding : 10px 20px;  /* Отступы */  
    cursor: pointer;  /* Курсор при наведении */
    margin: 10px;
    
}

</style>