import { PUBLIC_URL_BACKEND } from '$env/static/public';
import axios from 'axios';

const baseURL = PUBLIC_URL_BACKEND.replace(/\/$/, '');

export const api = axios.create({
    baseURL,
    timeout: 10_000,
});
