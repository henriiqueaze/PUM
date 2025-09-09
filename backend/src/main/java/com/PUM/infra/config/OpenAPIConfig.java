package com.PUM.infra.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    OpenAPI customOpenApi() {
        return new OpenAPI().info(new Info()
                .title("PUM (Plataforma Universal de Monitoria)")
                .description("Sistema de monitoria acadêmica escalável, desenvolvido para integrar alunos, monitores e cursos.")
                .version("V1")
                .termsOfService("https://github.com/henriiqueaze/PUM")
                .license(new License().name("MIT License").url("https://opensource.org/license/mit")));
    }
}
