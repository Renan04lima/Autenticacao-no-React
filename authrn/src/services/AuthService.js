import React from 'react';
import { AsyncStorage } from 'react-native';

export function isLogged() {
    return getUser().then((user) => (user !== null));
}

export async function getAccessToken() {
    let user = await AsyncStorage.getItem('AUTH_USER');

    if (!user) return null;

    user = JSON.parse(user);
    return user.object.token;
}

export async function getUser() {
    let user = await AsyncStorage.getItem('AUTH_USER');

    if (!user) return null;

    user = JSON.parse(user);

    return user.data;
}

export async function setAuthUser(loginRequest) {
    return await AsyncStorage.setItem('AUTH_USER', JSON.stringify(loginRequest));
}

export async function logout() {
    return await AsyncStorage.removeItem('AUTH_USER');
}