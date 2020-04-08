import { AsyncStorage } from 'react-native';

/**
 *
 * @param key Key value of the object to be saved
 * @param object The Object to save
 * @param ttl (Optional) set an expiration date on an object in ms
 * @return {Promise<void>}
 */
export const setObjectForKey = async ({key, object, ttl = undefined }) => {

    if (!key) throw new Error('Cannot set an object without a key');

    if (!object) throw new Error('Cannot set a key without an object');

    let expiresAt = undefined;
    if (ttl) {
        expiresAt = new Date().getTime() + ttl;
    }
    let wrappedObj = {
        object,
        expiresAt,
    };
    let stringedWrapper = JSON.stringify(wrappedObj);

    return await AsyncStorage.setItem(key,stringedWrapper)
};


/**
 *
 * @param key The key of the object to remove
 * @return {Promise<void>}
 */
export const removeObjectForKey = async (key) => {
    return await AsyncStorage.removeItem(key)
};


/**
 *
 * @param key The key of the object to retrieve
 * @return {Promise<*>}
 */
export const getObjectForKey = async (key) => {
    let now = new Date().getTime();
    let stringedWrapper = await AsyncStorage.getItem(key);

    if (!stringedWrapper) throw new Error('No key found for object');

    let wrapper = JSON.parse(stringedWrapper);
    if (wrapper.expiresAt < now) {
        // Object expired
        AsyncStorage.removeItem(key);
        throw new Error('Object expired');
    } else {
        return wrapper.object;
    }
};

const deviceStorage = {
    //
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async loadJWT() {
        try {
            return await AsyncStorage.getItem('id_token');
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};

export default deviceStorage;