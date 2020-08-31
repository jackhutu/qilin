{
  "private": true,
  "scripts": {
    "start": "qilin dev",
    "build": "qilin build",
    "prettier": "prettier --write '**/*.{js,jsx,tsx,ts,less,md,json}'"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write"
    ]
  },
  "dependencies": {
    "axios": "^0.19.2",
    "connected-react-router": "^6.8.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-redux": "^7.2.1",
    "react-router": "^5.2.0",
    "react-router-config": "^5.1.1",
    "react-router-dom": "^5.2.0",
    "redux": "^4.0.5",
    "qilin": "^{{{ version }}}"
  },
  "devDependencies": {
    "@types/react-router-config": "^5.0.1",
    "@types/react-router-dom": "^5.1.5",
    "lint-staged": "^10.0.7",
    "prettier": "^1.19.1"
  }
}
