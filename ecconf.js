module.exports = {
    addons: (config) => ({
        ...config.addons,

        eslint: {
            extends: (prevExtends) => ([
                ...prevExtends,
                require.resolve('eslint-config-airbnb'),
            ]),
            rules: {
                'import/no-unresolved': 'off',
                'import/extensions': 'off',
                'import/no-extraneous-dependencies': 'off',
                'react/jsx-indent': ['warn', 4],
                'react/jsx-indent-props': ['warn', 4],
                'react/jsx-filename-extension': 'off',
                'react/sort-comp': 'off',
                'react/prop-types': 'warn',
                'react/forbid-prop-types': 'off',
                'react/no-unused-prop-types': 'off',
                'react/prefer-stateless-function': 'warn',
                'react/no-array-index-key': 'off',
                'react/require-default-props': 'off',
                'jsx-a11y/no-noninteractive-element-interactions': 'off',
                'jsx-a11y/no-static-element-interactions': 'off'
            },
        },

        babel: {
            presets: (presets) => ([
                ...presets,
                require.resolve('babel-preset-react'),
            ]),
        },
    }),

    runners: (config) => ({
        ...config.runners,

        webpack: {
            '$entry.main': (entries = []) => {
                if (config.options.devMode) {
                    return [
                        require.resolve('react-hot-loader/patch'),
                        ...entries,
                    ];
                }

                return entries;
            },

            '$module.rules[**].use[**][loader=babel-loader].options': (loaderOptions = {}) => ({
                ...loaderOptions,
                plugins: [
                    ...(loaderOptions.plugins || []),
                    require.resolve('react-hot-loader/babel'),
                ],
            }),

            '$module.rules[**].use[**][loader=css-loader].options': (loaderOptions = {}) => ({
                ...loaderOptions,
                modules: true,
            }),

            resolve: {
                alias: {
                    'react': require.resolve('react'),
                    'react-dom': require.resolve('react-dom'),
                    'react-hot-loader': require.resolve('react-hot-loader'),
                },
            },
        },

        jest: {
            moduleNameMapper: {
                '^react$': require.resolve('react'),
                '^enzyme$': require.resolve('enzyme'),
                '^enzyme-adapter-react-16$': require.resolve('enzyme-adapter-react-16'),
                '^react-test-renderer/shallow$': require.resolve('react-test-renderer/shallow'),
            },

            setupFiles: (files = []) => ([
                ...files,
                require.resolve('./config/jest/setupEnv'),
            ]),
        }
    }),
};
