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
</style>