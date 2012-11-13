define('configuration/slx20for753/production', ['configuration/production', 'Mobile/Slx20for753/ApplicationModule'], function(baseConfiguration, Slx20for753ApplicationModule) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new Slx20for753ApplicationModule()
        ]
    });
});
