FROM andreptb/oracle-java:8
MAINTAINER Andre Albino Pereira <andreptb@gmail.com>

ENV CATALINA_HOME="/usr/local/tomcat" \
    PATH="/usr/local/tomcat/bin:$PATH" \
    TOMCAT_MAJOR_VERSION=8 \
    TOMCAT_MINOR_VERSION=8.0.47 \
    APACHE_MIRROR="https://archive.apache.org/dist" \
    APR_VERSION=1.6.2 \
    TOMCAT_NATIVE_VERSION=1.2.14
RUN mkdir -p "${CATALINA_HOME}"
WORKDIR $CATALINA_HOME

RUN set -x \
  && apk --no-cache add --virtual build-dependencies wget ca-certificates tar alpine-sdk gnupg \
  && gpg --keyserver pool.sks-keyservers.net --recv-keys \
        05AB33110949707C93A279E3D3EFE6B686867BA6 \
        07E48665A34DCAFAE522E5E6266191C37C037D42 \
        47309207D818FFD8DCD3F83F1931D684307A10A5 \
        541FBE7D8F78B25E055DDEE13C370389288584E7 \
        61B832AC2F1C5A90F0F9B00A1C506407564C17A3 \
        713DA88BE50911535FE716F5208B0AB1D63011C7 \
        79F7026C690BAA50B92CD8B66A3AD3F4F22C4FED \
        9BA44C2621385CB966EBA586F72C284D731FABEE \
        A27677289986DB50844682F8ACB77FC2E86E29AC \
        A9C5DF4D22E99998D9875A5110C01C5A2F6059E7 \
        DCFD35E0BF8CA7344752DE8B6FB21E8933C60243 \
        F3A04C595DB5B6A5F1ECA43E3B7BBB100D811BBE \
        F7DA48BB64BCB84ECBA7EE6935CD23C10D498E23 \
  && update-ca-certificates \
  && wget -q --no-check-certificate "${APACHE_MIRROR}/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz" \
  && wget -q --no-check-certificate "${APACHE_MIRROR}/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz.asc" \
  && gpg --verify "apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz.asc" \
  && tar -xf "apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz" --strip-components=1 \
  && rm bin/*.bat \
  && rm "apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz" \
  && cd /tmp \
  && wget -q --no-check-certificate "${APACHE_MIRROR}/tomcat/tomcat-connectors/native/${TOMCAT_NATIVE_VERSION}/source/tomcat-native-${TOMCAT_NATIVE_VERSION}-src.tar.gz" \
  && wget -q --no-check-certificate "${APACHE_MIRROR}/apr/apr-${APR_VERSION}.tar.gz" \
  && tar -xf "apr-${APR_VERSION}.tar.gz" && cd "apr-${APR_VERSION}" && ./configure && make && make install \
  && cd /tmp && tar -xf "tomcat-native-${TOMCAT_NATIVE_VERSION}-src.tar.gz" && cd "tomcat-native-${TOMCAT_NATIVE_VERSION}-src/native" \
  && ./configure --with-apr="/usr/local/apr/bin" --with-java-home="$JAVA_HOME" --with-ssl=no --prefix="$CATALINA_HOME" \
  && make && make install \
  && ln -sv "${CATALINA_HOME}/lib/libtcnative-1.so" "/usr/lib/" && ln -sv "/lib/libz.so.1" "/usr/lib/libz.so.1" \
  && cd / \
  && rm -rf /tmp/* \
  && sed -i 's/SSLEngine="on"/SSLEngine="off"/g' "${CATALINA_HOME}/conf/server.xml" \
  && echo '<?xml version="1.0" encoding="UTF-8"?>                                                                 ' > ${CATALINA_HOME}/conf/context.xml  \
  && echo '<Context>                                                                                              ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '                                                                                                       ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '  <Resource name="jdbc/simplevatDS" auth="Container" type="javax.sql.DataSource"                       ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '               maxTotal="100" maxIdle="30" maxWaitMillis="10000"                                       ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '               username="simplevat" password="BlackSea123$" driverClassName="com.mysql.jdbc.Driver"    ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '               url="jdbc:mysql://localhost:3306/simplevat"/>                                           ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '                                                                                                       ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo '</Context>                                                                                             ' >> ${CATALINA_HOME}/conf/context.xml \
  && echo  '<?xml version="1.0" encoding="UTF-8"?>                                                                ' > ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '                                                                                                      ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '<tomcat-users xmlns="http://tomcat.apache.org/xml"                                                    ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"                                   ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"                      ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '              version="1.0">                                                                          ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '                                                                                                      ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '  <role rolename="tomcat"/>                                                                           ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '  <role rolename="manager-gui"/>                                                                      ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '  <role rolename="admin-gui"/>                                                                        ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '  <user username="tomcat" password="Pulsor123$" roles="tomcat,manager-gui,manager-gui"/>              ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '                                                                                                      ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && echo  '</tomcat-users>                                                                                       ' >> ${CATALINA_HOME}/conf/tomcat-users.xml \
  && apk del --purge build-dependencies
  

EXPOSE 8080
CMD ["catalina.sh", "run"]
COPY simplevat-web/target/ROOT.war ${CATALINA_HOME}/webapps/
