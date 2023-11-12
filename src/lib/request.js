// env
import {env} from '$env/dynamic/public';
import {error} from '@sveltejs/kit';

const validateCaptcha = (action) => {
  return new Promise((res) => {
    // eslint-disable-next-line no-undef
    grecaptcha.ready(() => {
      // eslint-disable-next-line no-undef
      grecaptcha.execute(env.PUBLIC_SITEKEY, {action: action}).then((token) => {
        return res(token);
      });
    });
  });
};

export const request = async ({
                                method = 'GET',
                                url = '/',
                                body = null,
                                captcha = '',
                                fetchHandler = fetch
                              }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    if (captcha !== '') {
      await validateCaptcha(captcha).then((token) => {
        body.captcha = token;
      });
    }

    await fetchHandler(getURL(url), {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined
    })
      .then(async (res) => ({status: res.status, body: await res.json()}))
      .then(({status, body}) => {
        if (body?.success) {
          resolve({status, body});
        } else {
          reject(error(status ?? 500, body));
        }
      })
      .catch((err) => {
        let {status, body} = err;

        if (body) {
          reject(error(status ?? 500, body));
        } else {
          reject(
            error(status ?? 504, {
              success: false,
              data: {
                code: 'UNEXPECTED_ERROR',
                message:
                  err?.message ??
                  'An error occurred while attempting to process your request. Please try again later.'
              }
            })
          );
        }
      });
  });
};

export const getURL = (url) => {
  return env.PUBLIC_API_URL + url;
};
