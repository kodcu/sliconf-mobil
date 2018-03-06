import { AsyncStorage } from 'react-native';
const store = {
    code: '',
};

AsyncStorage.getItem('Code').then((value) => {
  store.code = value;
});

export default store;
