import queryString from "query-string";
import axios from "axios";
import _ from "lodash";
import { Alert } from "react-native";
import { getAccessToken } from "./AuthService";

// axios.defaults.baseURL = "http://15.228.3.203:3001";
axios.defaults.baseURL = 'http://84646e9113a4.ngrok.io';

axios.interceptors.request.use(
	function(config) {
		return getAccessToken().then(accessToken => {
			if (accessToken) {
				const authorization = "Bearer " + accessToken;

				config.headers["Authorization"] = axios.defaults.headers.common[
					"Authorization"
				] = authorization;
			}

			return config;
		});
	},
	error => Promise.reject(error)
);

axios.interceptors.response.use(response => response, function(error) {
	if (error.response && error.response.status === 422) {
		let errorMessage = [];

		_.forEach(error.response.data.validationErrors, error => {
			error.forEach(item => {
				errorMessage.push(item);
			});
		});

		Alert.alert("Dados Inválidos", errorMessage.join(" "));
	}

	if (error.response && error.response.status === 400) {
		console.log(error.response.data);
	}

	if (error.response && error.response.status === 409) {
		Alert.alert(
			"Ação inválida",
			"Seu usuário não tem permissão para realizar esta ação."
		);
	}

	return Promise.reject(error);
});

function parse(path, params) {
	_.forEach(
		params,
		(value, key) => (path = _.replace(path, "{" + key + "}", value))
	);

	let queryParams = {};

	_.forEach(params, (value, key) => {
		if (key[0] === "@") {
			const queryParamKey = _.replace(key, "@", "");
			queryParams[queryParamKey] = value;
		}
	});

	if (!_.isEmpty(queryParams)) {
		path += "?" + queryString.stringify(queryParams);
	}

	return path;
}

export default class HttpService {
	static list(path, params = {}, data = {}) {
		return axios
			.get(parse(path, params), { params: data })
			.then(response => response.data)
			.catch(error => error);
	}

	static findPage(path, params = {}) {
		return axios.get(parse(path, params)).then(response => response.data);
	}

	static find(path, params = {}) {
		return axios.get(parse(path, params)).then(response => response.data);
	}

	static insert(path, data, params = {}) {
		return axios
			.post(parse(path, params), data)
			.then(response => response.data);
	}

	static update(path, params = {}, data = {}) {
		return axios
			.put(parse(path, params), data)
			.then(response => response.data);
	}

	static patch(path, params = {}, data = {}) {
		return axios
			.patch(parse(path, params), data)
			.then(response => response.data);
	}

	static remove(path, params = {}) {
		return axios.delete(parse(path, params));
	}

	static login(credentials) {
		const headers = { "WWW-Authenticate": "Basic realm=localhost" };
		return axios
			.post("auth/login", credentials, { headers })
			.then(response => response.data);
	}

	static upload(args) {
		let data = new FormData();
		data.append("picture", args.file);
		data.append("name", args.file.name);

		const config = {
			headers: {
				"content-type": "multipart/form-data; charset=utf-8"
			},
			onUploadProgress: args.uploadStatusCallback
		};

		let fullPath = args.params ? parse(args.path, args.params) : args.path;

		return axios
			.post(fullPath, data, config)
			.then(response => response.data);
	}

	static uploadImage(image) {
		const data = new FormData();

		data.append("name", "testName");
		data.append("file", {
			uri: image.uri,
			type: "image/jpeg",
			name: "testPhotoName"
		});
		

		const config = {
			headers: {
				"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL"
			}
		};

		return axios
			.post("user/avatar", data, config)
			.then(response => console.log(response.data));
	}
}
