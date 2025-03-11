<template>
    <main>
        <section>
            <h2>О художнике</h2>
            <div class="container">
                <p class="text">Привет! На данный момент вы находитесь на моём, пусть ещё не популярном сайте. Я - Xiany, начинающий художник, и скорее всего вы будете наблюдать здесь мои арты которые по стилистике будут очень меняться, ведь я ещё в поисках своего стиля^-^ а также мои любительские фотографии.</p>
                <div class="photo-block">
                    <img class="image" src="@/assets/images/author.jpg" alt="author">
                    <p class="podpis">Анужис Ксения, 20 лет</p>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
 
</script>

<style scoped>
main {

    flex: 1 0 auto;
    h2 {
        width: 100%;
        text-align: center;
        overflow: hidden;
     }

     h2:before, h2:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: 1px;
        background: #000;
        border: solid #f2e8fc;
        border-width: 0 1em;
    }

    h2:before {
        margin-left: -100%;
    }

    h2:after {
        margin-right: -100%;
    }
    p {
        font-size: 20px; /* Размер текста в пикселях */
        text-align: left;
        margin: 0;
    }
    .container {
        display: flex;
        justify-content: flex-start; /* Выравниваем содержимое влево */
        align-items: flex-start; /* Убираем вертикальное центрирование */
        padding-left: 20px;
        
    }
    .text {
        flex: 1; /* Текст занимает всё оставшееся пространство */
    }
    .photo-block {
        display: flex;
        flex-direction: column; /* Расположить элементы вертикально */
        align-items: center; /* Центрировать подпись и фото по горизонтали */
        margin-top: 20px; /* Отступ от хедера */
    }

    .image {
        max-width: 300px; /* Задай фиксированный размер фото */
        height: auto; /* Сохрани пропорции изображения */
        margin-bottom: 20px;
        
    }
    .podpis {
        font-size: 20px; /* Размер шрифта подписи */
        color: #000000; /* Цвет текста подписи */
        text-align: center;
    }
 


}
</style>