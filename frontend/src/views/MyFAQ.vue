<template>
    <main>
        <h2>FAQ</h2>
        <div class="faq-item">
          <div class="faq-question">
            <h3>Как я могу оставить комментарии?</h3>
            <img src="@/assets/icons/paperclip.svg" alt="paperclip" class="faq-icon" @click="toggleAnswer">
          </div>
          <div class="faq-answer" v-show="isAnswerVisible">
            Кликнув на сам пост можно открыть личное окно поста, пролистав который ниже можно заметить комментарии, где и можно прокомментировать пост.
          </div>
        </div> 
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAnswerVisible: false, 
      };
    },
    methods: {
      
      toggleAnswer() {
        this.isAnswerVisible = !this.isAnswerVisible; 
      },
    },
  };
  </script>
  
  <style scoped>
  main {
    width: 100%;
    flex: 1 0 auto;
  }
  
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
  
  .faq-item {
    border: 1px solid #555; 
    padding: 15px; 
    background-color: #f2e8fc; 
    display: flex;
    flex-direction: column; 
    gap: 10px; 
    margin-bottom: 20px; 
  }
  
  .faq-question {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
  }
  
  .faq-answer {
    width: 80%;
    font-size: 20px; 
    color: #000000; 
  }
  
  .faq-icon {
    width: 45px; 
    margin-left: 10px; 
    cursor: pointer; 
  }
  </style>