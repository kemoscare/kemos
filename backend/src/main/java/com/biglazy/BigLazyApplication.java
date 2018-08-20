package com.biglazy;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class BigLazyApplication extends Application<BigLazyConfiguration> {

    public static void main(final String[] args) throws Exception {
        new BigLazyApplication().run(args);
    }

    @Override
    public String getName() {
        return "BigLazy";
    }

    @Override
    public void initialize(final Bootstrap<BigLazyConfiguration> bootstrap) {
        // TODO: application initialization
    }

    @Override
    public void run(final BigLazyConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
    }

}
