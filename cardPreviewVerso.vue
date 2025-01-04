<template>
    <div class="card" :class="{ 'print': cardType === 'print', 'app': cardType === 'app' }">
        <div class="right" v-html="marked(cardData.text || '')" v-if="(cardData.type !== 'end')"></div>
        <div class="right end" v-else>
            <div class="success" v-html="marked(cardData.success || '')"></div>
            <div class="failure" v-html="marked(cardData.failure || '')"></div>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked';
import {markedAndor} from "./markedAndor";

marked.use({
    gfm: true,
    breaks: true,
    silent: true,
});
marked.use(markedAndor());

export default {
  props: {
    cardData: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'single'
    },
    series: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: ''
    },
    cardType: {
      type: String,
      default: 'edit'
    }
  },
  methods: {
    marked
  }
};
</script>

<style>
.card {
  height: 452px;
  width: 302px;
  position: relative;
  font-family: "Crimson Text", serif;
  color: black;
  letter-spacing: -0.2px;
  background: linear-gradient(90deg, #a26f3e 50%, #ebd188 50%);

  /* fixes for missing el-dialog__body in mini preview */
  font-size: 14px;
  word-break: normal;
}

.right {
  background-image: url("./assets/mini/right.png");
  background-size: cover;
  height: calc(100% - 10px);
  overflow: hidden;
  padding: 5px 10px;
  font-size: 13px;
  line-height: 1em;
}
.card :deep(hr) {
  overflow: visible;
  padding: 0;
  border: none;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  padding-top: 1px;
}

.card :deep(p) {
  margin: 10px 0;
}

.card :deep(ul) {
  padding-left: 1.1rem;
  margin: 0;
}

.card :deep(ol) {
  padding-left: 1rem;
}

.card :deep(li) {
  padding: 2px 0;
}

.card :deep(.marked-andor-img) {
  height: 18px;
  vertical-align: sub;
}

.card :deep(blockquote) {
  border-radius : 5px;
  border: 1px solid #000000;
  margin: 5px 0 0;
  background: rgb(252,224,135);
  background: linear-gradient(180deg, rgba(252,224,135,1) 0%, rgba(253,247,214,1) 100%);
  padding: 5px;
}
.card :deep(blockquote p) {
  margin:0px;
}

.right.end {
  display: flex;
  flex-direction: column;
}

.right.end :deep(div) {
  flex-grow: 1;
  padding: 10px;
}

.right.end :deep(.success) {
  margin-bottom: 10px;
  margin-top: 5px;
  background: #a4d1e9;
  border: 2px solid #616b7f;
  background-image: url("./assets/N-blue.jpg");
  background-size: cover;
  background-position-y: bottom;
}

.right.end :deep(.failure) {
  background: #e9bb91;
  border: 2px solid #7e4a26;
  transform: rotate(180deg);
  margin-bottom: 5px;
  background-image: url("./assets/N-red.jpg");
  background-size: cover;
  background-position-y: bottom;
}

/* Ansicht für print css */

.card.print {
  padding: 25px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.card.print :deep(.left) {
  background-image: url("./assets/full/left_ohne.png");
  border: 1px dashed black;
  border-right: none;
  left: -1px;
}

.card.print :deep(.left_letter) {
  background-image: url("./assets/full/left_mit.png");
}

.card.print :deep(.right) {
  background-image: url("./assets/full/right.png");
  border: 1px dashed black;
  border-left: none;
}

.card.print :deep(.card .putcard .arrow) {
  background-image: url("./assets/full/arrow.png");
}

.card.2P, .card.3P, .card.4P {
  margin: 0 0 0 20px
}
</style>