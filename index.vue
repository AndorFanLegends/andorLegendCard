<template>
  <div class="card" :class="{ 'print': cardType === 'print', 'app': cardType === 'app' }">
    <div class="left" :class="{ 'left_letter': cardData.type === 'letter' || cardData.type === 'end' }" v-if="!(cardType === 'app')">
      <div class="left_number">{{ number }}</div>
      <div class="right_number">{{ number }}</div>
      <div class="legend">
        <div v-if="(type === 'series')" class="series">{{ series }}<br /><span>{{ number }}</span></div>
        <div class="name">{{ name }}</div>
      </div>
      <div v-if="(cardData.type === 'letter' || cardData.type === 'end')" class="number"
      :class="{ 'single' : cardData.name.length === 1 }"
      >
        {{ cardData.name[0] }}
        <span>{{ cardData.name[1] || '' }}</span>
      </div>
      <div v-if="(cardData.type === 'custom')" class="cardname">
        <div class="title">{{ cardData.name }}</div>
        <div>{{ cardData.subname }}</div>
      </div>
      <div v-if="(cardData.type === 'put')" class="putcard">
        <div class="arrow"></div>
        <div class="title">{{ cardData.name }}</div>
        <div>Révélez cette carte dès que le Narrateur atteint cette case sur la Piste des Légendes.</div>
      </div>
    </div>
    <div class="right" v-html="marked(cardData.text || '')" v-if="(cardData.type !== 'end')"></div>
    <div class="right end" v-else>
      <div class="success" v-html="marked(cardData.success || '')"></div>
      <div class="failure" v-html="marked(cardData.failure || '')"></div>
    </div>
  </div>
</template>

<script>
//import MDtoHTML from "marked";
import { marked } from 'marked';

marked.use({
    gfm: true,
    breaks: true,
    silent: true,
    extensions: [emoji], 
    //extensions: [descriptionList, description]
    //smartypants: true,
});//.use({ );
//marked.use({ extensions: [emoji] });

/*MDtoHTML.setOptions({
  sanitize: true,
  breaks: true,
  gfm: true
});*/

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
    MDtoHTML
  }
};
</script>

<style scoped>
.card {
  height: 452px;
  width: 604px;
  position: relative;
  font-family: "Crimson Text", serif;
  color: black;
  letter-spacing: -0.2px;
  background: linear-gradient(90deg, #a26f3e 50%, #ebd188 50%);

  /* fixes for missing el-dialog__body in mini preview */
  font-size: 14px;
  word-break: normal;
}

.left {
  background-image: url("./asserts/mini/left_ohne.png");
  background-size: cover;
  height: 100%;
  width: 50%;
  float: left;
  position: relative;
}

.left_letter {
  background-image: url("./asserts/mini/left_mit.png");
}

.right {
  background-image: url("./asserts/mini/right.png");
  background-size: cover;
  height: calc(100% - 10px);
  overflow: hidden;
  padding: 5px 10px;
  font-size: 13px;
  line-height: 1em;
}

.card .left_number,
.card .right_number {
  position: absolute;
  display: block;
  width: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  top: 28px;
}
.card .left_number { left: 30px; }
.card .right_number { right: 27px; }

.card .legend {
  position: absolute;
  width: calc(100% - 60px);
  top: 115px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 1em;
  padding: 0 30px;
  word-break: normal;
}
.card .name {
  font-size: 17px;
  line-height: 1em;
}
.card div.name:only-child {
  padding-top: 35px;
  margin-top: 35px;
  padding: 0 10px;
}
.card .legend .series span {
  font-size: 60px;
  line-height: 1em;
}

.card .cardname,
.card .putcard {
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  position: absolute;
  width: calc(100% - 80px);
  margin: 0 40px;
  line-height: 1em;
}
.card .cardname { top: 350px; }

.card .cardname .title,
.card .putcard .title {
  font-weight: bold;
  font-size: 17px;
}

.card .putcard {
  text-align: left;
  margin: 0 40px 0 30px;
  top: 330px;
}
.card .putcard .arrow {
  background-image: url("./asserts/mini/arrow.png");
  width: 49px;
  height: 88px;
  float: left;
  margin-right: 15px;
}
.card .putcard .title {
  padding-top: 10px;
}

.card .number {
  -webkit-text-stroke: 2px black;
  color: white;
  font-size: 100px;
  position: absolute;
  top: 200px;
  left: 100px;
}

.card .number.single {
    left: 120px;
}

.card .number span {
  font-size: 80px;
  display: inline-block;
  margin-left: -20px;
}

.card >>> hr {
  overflow: visible;
  padding: 0;
  border: none;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  padding-top: 1px;
}

.card >>> p {
  margin: 10px 0;
}

.card >>> ul {
  padding-left: 2rem;
  margin: 0;
}

.card >>> ol {
  padding-left: 1rem;
}

.card >>> li {
  padding: 2px 0;
}

.right.end {
  display: flex;
  flex-direction: column;
}

.right.end >>> div {
  flex-grow: 1;
  padding: 10px;
}

.right.end >>> .success {
  margin-bottom: 10px;
  margin-top: 5px;
  background: #a4d1e9;
  border: 2px solid #616b7f;
}

.right.end >>> .failure {
  background: #e9bb91;
  border: 2px solid #7e4a26;
  transform: rotate(180deg);
  margin-bottom: 5px;
}

/* Ansicht für print css */

.card.print {
  padding: 25px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.card.print >>> .left {
  background-image: url("./asserts/full/left_ohne.png");
  border: 1px dashed black;
  border-right: none;
  left: -1px;
}

.card.print >>> .left_letter {
  background-image: url("./asserts/full/left_mit.png");
}

.card.print >>> .right {
  background-image: url("./asserts/full/right.png");
  border: 1px dashed black;
  border-left: none;
}

.card.print >>> .card .putcard .arrow {
  background-image: url("./asserts/full/arrow.png");
}

/* Ansicht für die App */
.card.app {
  background: #ebd188;
  width: auto;
  height: 100%;
}

.card.app >>> .right {
  height: 100%;
  overflow: auto;
  font-size: 17px;
  line-height: 1.2em;
  padding-bottom: 20px;
}

.card.app >>> li {
  padding: 10px 0;
}
</style>
