<template>
    <div class="card" :class="{ 'print': cardType === 'print', 'app': cardType === 'app' }">
      <div class="left" :class="{ 'left_letter': cardData.type === 'letter' || cardData.type === 'end' }" v-if="!(cardType === 'app')">
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
    }
  },
  methods: {
    marked
  }
};
</script>