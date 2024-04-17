import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'am-gallery',
  components: {},
  props: ['images'],
  data () {
    return {
      imageIndex:0,
    }
  },
  computed: {
    ...mapGetters(['sharedEnv']),
  },
  mounted () {
  },
  methods: {
    cancelModal(){
      this.$emit('close');
    },

    GoToLeft(){
      const body = document.getElementById('body-thumbs'),
            thumbs = document.getElementById('thumbs-container');
      let offset = thumbs.offsetWidth - body.offsetWidth -(this.imageIndex *100);
      this.imageIndex--;
      if(this.imageIndex < 0){
        this.imageIndex = this.images.length -1;
        thumbs.style.left = `-${offset}px`;
        offset = thumbs.offsetWidth - body.offsetWidth -(this.imageIndex *100);
      }
      if(offset >= 0)
        thumbs.style.left = `-${100*this.imageIndex}px`;

      // let left = thumbs.style.left =="" ? 0 : parseInt(thumbs.style.left.split('px')[0]) ;
      // console.log("Offset :" +offset);
      // console.log("Left :" +left);
      // console.log("Index :" +this.imageIndex);

    },
    GoToRight(){
      const body = document.getElementById('body-thumbs'),
        thumbs = document.getElementById('thumbs-container');

      this.imageIndex++;
      if(this.imageIndex == this.images.length)
        this.imageIndex = 0;

      let offset = thumbs.offsetWidth - body.offsetWidth -(this.imageIndex *100);

      if(offset >= 0)
        thumbs.style.left = `-${100*this.imageIndex}px`;
      //let left = thumbs.style.left =="" ? 0 : parseInt(thumbs.style.left.split('px')[0]) ;
      // console.log("Offset :" +offset);
      // console.log("Left :" +left);

    },
    activeClass(index){

      const body = document.getElementById('body-thumbs'),
        thumbs = document.getElementById('thumbs-container');
      let offset = thumbs.offsetWidth - body.offsetWidth -(index*100);
      if(offset >= 0)
        thumbs.style.left = `-${100*index}px`;
      this.imageIndex = index;

    }
  }
}
