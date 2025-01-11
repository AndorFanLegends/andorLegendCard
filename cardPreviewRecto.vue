<template>
    <div class="card" :class="{ 'print': cardType === 'print', 'app': cardType === 'app' }">
      <div class="left" :class="[{ 'left_letter': cardData.type === 'letter' || cardData.type === 'end' }, theme]" v-if="!(cardType === 'app')">
        <!--<div class="left_number">{{ number }}</div>
        <div class="right_number">{{ number }}</div>-->
        <div class="legend">
          <div v-if="(type === 'series')" class="series">{{ series }}</div>
          <div class="name"> <span v-if="(type === 'series')">{{ number }} - </span> {{ name }}</div>
        </div>
        <div v-if="(cardData.type === 'letter' || cardData.type === 'end')" class="number"
        :class="{ 'single' : cardData.name.length === 1 }"
        >
          {{ cardData.name[0] }}
          <span>{{ cardData.name[1] || '' }}</span>
        </div>
        <div v-if="(cardData.type === 'custom')" class="cardname">
          <div class="title">{{ cardData.name }}</div>
          <div v-html="marked(cardData.subname)"></div>
        </div>
        <div v-if="(cardData.type === 'put')" class="putcard">
          <div class="arrow"></div>
          <div class="title">{{ cardData.name }}</div>
          <div>Révélez cette carte dès que le Narrateur atteint cette case sur la Piste des Légendes.</div>
        </div>
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
    },
    theme: {
      type: String,
      default: 'classicalTheme'
    }
  },
  methods: {
    marked
  }
};
</script>

<style scoped>
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

.left {
  background-image: url("./assets/mini/left_ohne.png");
  background-size: cover;
  height: 100%;
  width: 100%;
  float: left;
  position: relative;
}


.left_letter {
  background-image: url("./assets/mini/left_mit.png");
}

.left_letter.frostTheme {
  /*background-image: url("./assets/mini/left_mit.png");*/
  background-image: url("./assets/full/left-blue.png");
}

.card .left_number{
  position: absolute;
  display: block;
  width: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  top: 28px;
}
.card .left_number { left: 30px; }

.card .legend {
  position: absolute;
  width: 100%;
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
/*.card div.name:only-child {
  padding-top: 35px;
  margin-top: 35px;
  padding: 0 10px;
}*/
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
  background-image: url("./assets/mini/arrow.png");
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

</style>