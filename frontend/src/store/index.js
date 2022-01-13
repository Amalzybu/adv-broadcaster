import { createStore } from 'vuex'
import grpcall from '../grpc'


export default createStore({
  state: {
    grpc:null,
    client:null,
  },
  getters:{
    getGrpc: state => {
      return state.grpc
    }
  },
  mutations: {
    instantiateConnection(state) {
      
        state.grpc = new GrpcCall()
    }
  },
  actions: {
  },
  modules: {
  }
})
