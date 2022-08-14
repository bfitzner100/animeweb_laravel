@extends('layouts.site')

@section('content')
    <div class="content flex-grow">
        <header>
            <div
                class="featured"
                style="background: linear-gradient(to bottom, rgba(17, 24, 39,0) 0%, rgba(17, 24, 39,0) 25%, rgba(17, 24, 39,0.3) 75%, rgba(17, 24, 39,1) 100%),
                                   linear-gradient(to left, rgba(17, 24, 39,0) 0%, rgba(17, 24, 39,0) 25%, rgba(17, 24, 39,0) 85%, rgba(17, 24, 39,1) 100%),
                                   linear-gradient(to right, rgba(17, 24, 39,1) 0%, rgba(17, 24, 39,0.5) 50%, rgba(17, 24, 39,0) 85%, rgba(17, 24, 39,1) 100%),
                                   url('{{asset('images/home_back.jpg')}}');"
            >
                <div class="title">Demon Slayer</div>
                <div class="description">Em Kimetsu no Yaiba, Tanjiro, um bondoso jovem que ganha a vida vendendo carvão descobre que sua família foi
                    massacrada por um demônio. E, para piorar, Nezuko, sua irmã mais nova e única sobrevivente, também acabou transformada em um
                    demônio. Arrasado com essa sombria realidade, Tanjiro decide se tornar um matador de demônios para fazer sua irmã voltar a ser
                    humana e para destruir o demônio que matou seus entes queridos.
                </div>
                <div class="linkAnime">
                    <a href="#" class="button-watch"><i class="fas fa-play"></i>ASSISTIR AGORA</a>
                </div>
            </div>
        </header>
        <div class="content-anime">
            <div class="episodes-recents">
                <div class="section-title">
                    <h3>Episódios Recentes</h3>
                </div>
                <div class="netflix-slider">
                    <div class="swiper-container swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="content-slide">
                                    <div class="image">
                                        <img src="{{asset('images/teste1.jpg')}}" alt="Movie Title">
                                    </div>
                                    <div class="info">
                                        <div class="title">Kimetsu no Yaiba: Mugen no trem</div>
                                        <div class="info-cap">
                                            <div class="epi">Episódio: 10</div>
                                            <div class="quality">FULLHD</div>
                                        </div>
                                        <div class="lang">Dublado</div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                        </div>
                        <!-- Add Pagination -->
                        <!-- <div class="swiper-pagination"></div> -->
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
            <div class="episodes-recents">
                <div class="section-title">
                    <h3>Filmes Recentes</h3>
                </div>
                <div class="netflix-slider">
                    <div class="swiper-container swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="content-slide">
                                    <div class="image">
                                        <img src="{{asset('images/teste1.jpg')}}" alt="Movie Title">
                                    </div>
                                    <div class="info">
                                        <div class="title">Kimetsu no Yaiba: Mugen no trem</div>
                                        <div class="info-cap">
                                            <div class="epi">Episódio: 10</div>
                                            <div class="quality">FULLHD</div>
                                        </div>
                                        <div class="lang">Dublado</div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide"><img src="{{asset('images/teste2.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste3.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                            <div class="swiper-slide"><img src="{{asset('images/teste1.jpg')}}" alt="Movie Title"></div>
                        </div>
                        <!-- Add Pagination -->
                        <!-- <div class="swiper-pagination"></div> -->
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
