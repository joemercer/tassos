"use strict";angular.module("tassosApp",[]),angular.module("tassosApp").controller("MainCtrl",["$scope","CardsService",function(a,b){a.card={title:"Press 'Next card'",description:"You gotta if you wanna start the game o_O"},a.getCard=function(){a.card=b.get()}}]),angular.module("tassosApp").service("CardsService",function(){var a="https://docs.google.com/spreadsheets/d/115idP64c_fvIxJw6zm6A8-feGbCjOeYxp3DnOPwMBhM/pubhtml";this.cards=[],this.current=0,this.get=function(){if(!this.cards.length)return{error:!0,message:"Loading cards... hold on"};var a=this.cards[this.current];return a?(this.current++,a):{error:!0,message:"Ran out of cards :(",title:"Last card!",description:"Reload the page if you dare to play again"}},Tabletop.init({key:a,simpleSheet:!0,parseNumbers:!0,callback:angular.bind(this,function(a){this.cards=a})})});