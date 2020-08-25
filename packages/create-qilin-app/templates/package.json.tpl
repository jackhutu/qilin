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
    "lint-staged": "^10.0.7",
    "prettier": "^1.19.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "redux": "^4.0.5",
    "react-redux": "^7.1.0",
    "qilin": "^{{{ version }}}"
  }
}
