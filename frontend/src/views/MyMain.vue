<template>
<main>
    <aside> 
        <section> 
            <h2>О художнике</h2> 
            <p>Привет! На данный момент вы находитесь на моём, пусть ещё не популярном сайте. 
                Я - Xiany, начинающий художник, и скорее всего вы будете наблюдать здесь мои арты 
                которые по стилистике будут очень меняться, ведь я ещё в поисках своего стиля^-^ а 
                также мои любительские фотографии.
            </p> 
            <div>

            </div>
            <img src="@/assets/images/author.jpg" alt="author">
        </section>
        <section> 
           <img src="@/assets/images/2.jpg" alt="picture">
        </section>
        <section>
            <h2>Мои соцсети</h2>
            <a href="https://t.me/+dzrrqB_OawA4N2Fi"><img src="@/assets/icons/tg.svg"></a>
            <a href="https://vk.com/sei_xiany"><img src= "@/assets/icons/vk.svg"></a>
        </section>
    </aside> 

    <section id="loading" v-if="!posts"><span class="loader"></span><h2>Загрузка...</h2></section>
    <section id="blog" v-if="posts">
        <article  v-for="post in posts" v-bind:key="post.id">
            <h3>{{ post.heading }}</h3>
            <span>Опубликовано {{ formatDate(post.created_at) }} от {{ post.username }}</span>
            <p>{{ post.description }}</p>
            <!-- <div> Количество лайков:<strong>{{ post.likes }}</strong></div> -->
            <!-- <button v-on:click="addLike" id="like"><img src="@/assets/icons/heart.svg">Like</button> -->
        </article>
    </section>
</main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default {
  computed: {
    ...mapGetters('posts', ['allPosts']),
    posts() {
      return this.allPosts;
    },
  },
  async mounted() {
    await this.fetchPosts();
  },
  methods: {
    ...mapActions('posts', ['fetchPosts']),
    formatDate(dateString) {
      return format(new Date(dateString), 'dd.MM.yyyy в HH:mm', { locale: ru });
    },
  },
};
</script>

<style scoped>
main {
    flex: 1 0 auto;
    display: flex;
    

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

    aside {
        margin: 1em;
        flex: 1 0;

        section {
            margin-bottom: 1em;
            padding: 1em;

            border: 1px solid #000;

            img {
                max-width: 100%;
            }
            a {
                img {
                    width:50px;
                    height:50px;
                    margin: 5px;
                }
            }
        }
    }
    section#loading {

        padding: auto;
        flex: 2 0;
        margin: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .loader {
            margin: 1em;
            width: 40px;
            height: 60px;
            animation: heartBeat 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .loader:before,
        .loader:after {
            content: "";
            background: #ff7581 ;
            width: 40px;
            height: 60px;
            border-radius: 50px 50px 0 0;
            position: absolute;
            left: 0;
            bottom: 0;
            transform: rotate(45deg);
            transform-origin: 50% 68%;
            box-shadow: 5px 4px 5px #0004 inset;
        }
        .loader:after {
            transform: rotate(-45deg);
        }
    }

    section#blog {
        margin: 1em;
        flex: 2 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        article {
            margin-bottom: 1em;
            padding: 1em;

            display: flex;
            flex-direction: column;
            align-items: center;

            border: 1px solid #000;

        

            img {
                max-width: 100%;
            }

            span {
                width: 90%;
                text-align: center;
                overflow: hidden;
            }

            span:before, span:after {
                content: '';
                display: inline-block;
                vertical-align: middle;
                width: 100%;
                height: 1px;
                background: #000;
                border: solid #f2e8fc;
                border-width: 0 1em;
            }
    
            span:before {
                margin-left: -100%;
            }
    
            span:after {
                margin-right: -100%;
            }

            button {
                background-color: transparent;
                color: #000000; 
                padding: 10px 20px;
                font-size: 16px; 
                cursor: pointer;
                transition: color 0.3s ease;
                border-radius: 30px;
                
            }
            #like {
                margin-right: auto;  
            }
            
        }
    }
}



@media all and (max-width: 900px) {
    main {
        flex-direction: column-reverse;
    }
}

@media all and (min-width: 901px) and (max-width: 1124px) {
    main {
        flex-direction: row-reverse;
    }
}

@media all and (min-width: 1125px) {
    main {
        flex-direction: row-reverse;
    }
}

@keyframes heartBeat {
  0% { transform: scale(0.95) }
  5% { transform: scale(1.1) }
  39% { transform: scale(0.85) }
  45% { transform: scale(1) }
  60% { transform: scale(0.95) }
  100% { transform: scale(0.9) }
}
</style>