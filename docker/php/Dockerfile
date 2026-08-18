FROM php:8.4-fpm

RUN apt update && apt install -y \
    git \
    unzip \
    curl \
    libbz2-dev \
    libicu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libxml2-dev \
    libonig-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        && docker-php-ext-install -j$(nproc) \
        bcmath \
        bz2 \
        ctype \
        curl \
        dom \
        exif \
        fileinfo \
        gd \
        intl \
        mbstring \
        mysqli \
        pcntl \
        pdo \
        pdo_mysql \
        simplexml \
        xml \
        xmlreader \
        xmlwriter \
        xsl \
        zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

RUN chown -R www-data:www-data \
    /var/www/storage \
    /var/www/bootstrap/cache

CMD ["php-fpm"]