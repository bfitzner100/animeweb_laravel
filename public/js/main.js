// Variaveis

// Exibe os itens que possuem o flickity (Feature para a quebra de linhas)
$(document).ready(function() {
    $(".containerLetras, .tabsContainers").removeClass('rteam_preloader');
    $('.containerLetras i, .rteam_preloader_loader').remove();
});

// Header
// Abrir Hist..
$('.btnhistorico').on('click', function() {
    if ( $('.favfixed').is(':hidden') ) {
        $(this).addClass('active');
        $('.favfixed').slideDown();
		$('body').toggleClass('notscrollbar');
    } else {
        $(this).removeClass('active');
        $('.favfixed').slideUp();
    }
});

// CloseHis
$('.CloseHis').on('click', function() {
    if ( $('.favfixed').is('active') ) {
        $(this).removeClass('active');
        $('.favfixed').slideUp();
    } else {
        $(this).removeClass('active');
        $('.favfixed').slideUp();
		$('body').removeClass('notscrollbar');
    }
});

// Abrir busca do site
$('.btnSearch').on('click', function() {
    if ( $('.buscaHeader').is(':hidden') ) {
        $(this).addClass('active');
        $('.buscaHeader').slideDown();
    } else {
        $(this).removeClass('active');
        $('.buscaHeader').slideUp();
    }
});

// Index
// Trocar as abas dos animes na index
$('.abasIndex ul li').on('click', function() {
    // Variaveis
    let th = $(this);
    let tg = th.data('target');

    // Remove a cor da aba anterior
    $('.abasIndex ul li.active').removeClass('active');
    // Adiciona a cor na aba atual
    $(th).addClass('active');
    // Esconde o conteudo da aba anterior
    $('.aniSliderContainer.active').removeClass('active');
    // Exibe o conteudo da aba atual
    $(`#${tg}`).addClass('active');
    // Liga o slider no conteudo da aba atual
    $(`#${tg}`).flickity({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        prevNextButtons: true
    });
});

// Single - Anime
// Troca de Aba ao clicar
$(`.abaAnimeItem`).on(`click`, function() {
    let tg = $(this).data(`target`);

    // Troca a aba ativa
    $('.abaAnimeItem.active').removeClass('active');
    $(this).addClass('active');

    // Troca a View Visível
    $(`.anime_videos_section.active`).removeClass(`active`);
    $(`#${tg}`).addClass('active');
});

// Page - Lista de Animes
$('.yesnoOption').on('click', function() {
    // Variaveis
    let th = $(this);
    let tg = th.data('value');

    // Remove a classe de ativa da opcao anterior
    $('.yesnoOption.active').removeClass('active');
    // Adiciona a classe de ativa na opcao clicada
    $(th).addClass('active');
    // Muda a cor da yesnoContainer baseada na opcao selecionada e troca o data value do yesnoContainer
    if ( tg == 'yes' ) {
        $('.yesnoContainer').attr('data-value', 'yes');
        $('#anime_adulto').attr('value', 'yes');
        $('.yesnoContainer').removeClass('noActive');
        $('.yesnoContainer').addClass('yesActive');
        $('.yesnoIcon .ri-check-line').addClass('active');
        $('.yesnoIcon .ri-close-line').removeClass('active');
    } else {
        $('.yesnoContainer').attr('data-value', 'no');
        $('#anime_adulto').attr('value', 'no');
        $('.yesnoContainer').removeClass('yesActive');
        $('.yesnoContainer').addClass('noActive');
        $('.yesnoIcon .ri-close-line').addClass('active');
        $('.yesnoIcon .ri-check-line').removeClass('active');
    }
});

// Single - Episodios
// Trocar o player ao clicar na aba
$('.abasPlayers').on('click', function() {
    // Verifica se e a aba atual (por algum motivo o seletor not nao esta funcionando, creio que seja por causa do flickity, mas ainda irei testar futuramente)
    if ( ! $(this).hasClass('active') ) {
        // Variaveis
        let url = $(this).data('playerurl');
        let type = $(this).data('playertype');

        // Remove o status de ativa da aba anterior
        $('.abasPlayers.active').removeClass('active');

        // Adiciona o status de ativa na aba atual
        $(this).addClass('active');

        // Exibe a mensagem de player em loading
        player_load_events();

        // Cria os players dinamicamente
        show_player(url, type);
    }
});

// Define a height lateral dinamicamente baseada no tamanho do player
$(window).on('load', function() {
    setTimeout(() => {
        resize_sidebar_navigation();
    }, 500);
});

// Resize sidebar navigation
function resize_sidebar_navigation() {
	let height2New = $(".playersContainer").height();
    let calcHNew = height2New;
    // So diminui se o player tiver mais de 250px de altura
    if ( height2New >= 250 ) {
        $('.playersLeft').css('min-height', ''+calcHNew+'px');
        $('.playersLeft').css('max-height', ''+calcHNew+'px');
    }
}

// Funcao que cria um novo player e remove o anterior
function show_player(url, type, episodio_id) {

    var episodio_id =document.getElementById('episodio_id').value;

    // Remove o player anterior
    $('.playersBox').empty();

    // Adiciona o novo player
    if ( type == 'd' || type == 'm' ) {
        // Se for do b_api
        if ( url.indexOf("/b_api/") >= 0 ) {
            $.ajax({
                url: `${url}`,
                method: 'POST',
                data: {
                    getSources: "true"
                },
                success: function(response) {
                    // pega as sources
                    let vSources = JSON.parse(response);
                    let vSourcesNew = [];

                    vSources.forEach(function(item) {
                        vSourcesNew.push({
                            file: `${item.src}`,
                            'type': 'mp4',
                            label: `${item.size}p`
                        });
                    });

                    $('.playersBox').append(`<video id="player"></video>`);

                    // Inicializa o player
                    jwplayer("player").setup({
                        sources: vSourcesNew,
                        aspectratio: '16:9',
                        playbackRateControls: [0.5, 0.75, 1, 1.25, 1.5, 2],
                        width: '100%',
                        height: '100%',
                        primary: "html5",
                        abouttext: "Acesse: https://animespank.com",
                        autostart: false,
                        aboutlink: "https://animespank.com",
                        image: `${BASE_TEMA}/img/players/p02.jpg`
                    });

                    jwplayer('player').addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind2" viewBox="0 0 240 240" focusable="false"><path d="m 25.993957,57.778 v 125.3 c 0.03604,2.63589 2.164107,4.76396 4.8,4.8 h 62.7 v -19.3 h -48.2 v -96.4 H 160.99396 v 19.3 c 0,5.3 3.6,7.2 8,4.3 l 41.8,-27.9 c 2.93574,-1.480087 4.13843,-5.04363 2.7,-8 -0.57502,-1.174985 -1.52502,-2.124979 -2.7,-2.7 l -41.8,-27.9 c -4.4,-2.9 -8,-1 -8,4.3 v 19.3 H 30.893957 c -2.689569,0.03972 -4.860275,2.210431 -4.9,4.9 z m 163.422413,73.04577 c -3.72072,-6.30626 -10.38421,-10.29683 -17.7,-10.6 -7.31579,0.30317 -13.97928,4.29374 -17.7,10.6 -8.60009,14.23525 -8.60009,32.06475 0,46.3 3.72072,6.30626 10.38421,10.29683 17.7,10.6 7.31579,-0.30317 13.97928,-4.29374 17.7,-10.6 8.60009,-14.23525 8.60009,-32.06475 0,-46.3 z m -17.7,47.2 c -7.8,0 -14.4,-11 -14.4,-24.1 0,-13.1 6.6,-24.1 14.4,-24.1 7.8,0 14.4,11 14.4,24.1 0,13.1 -6.5,24.1 -14.4,24.1 z m -47.77056,9.72863 v -51 l -4.8,4.8 -6.8,-6.8 13,-12.99999 c 3.02543,-3.03598 8.21053,-0.88605 8.2,3.4 v 62.69999 z"></path></svg>', 'Avan\xE7ar 10s', function() {
                        jwplayer('player').seek(jwplayer('player').getPosition() + 10)
                    }, 'Avan\xE7ar 10s');
                    jwplayer('player').addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind" viewBox="0 0 240 240" focusable="false"><path d="M113.2,131.078a21.589,21.589,0,0,0-17.7-10.6,21.589,21.589,0,0,0-17.7,10.6,44.769,44.769,0,0,0,0,46.3,21.589,21.589,0,0,0,17.7,10.6,21.589,21.589,0,0,0,17.7-10.6,44.769,44.769,0,0,0,0-46.3Zm-17.7,47.2c-7.8,0-14.4-11-14.4-24.1s6.6-24.1,14.4-24.1,14.4,11,14.4,24.1S103.4,178.278,95.5,178.278Zm-43.4,9.7v-51l-4.8,4.8-6.8-6.8,13-13a4.8,4.8,0,0,1,8.2,3.4v62.7l-9.6-.1Zm162-130.2v125.3a4.867,4.867,0,0,1-4.8,4.8H146.6v-19.3h48.2v-96.4H79.1v19.3c0,5.3-3.6,7.2-8,4.3l-41.8-27.9a6.013,6.013,0,0,1-2.7-8,5.887,5.887,0,0,1,2.7-2.7l41.8-27.9c4.4-2.9,8-1,8,4.3v19.3H209.2A4.974,4.974,0,0,1,214.1,57.778Z"></path></svg>', 'Voltar 10s', function() {
                        jwplayer('player').seek(jwplayer('player').getPosition() - 10)
                    }, 'Voltar 10s');

                    // Esconde o loader do player
                    promise_player_load().then(function() {
                        resize_sidebar_navigation();
                        player_load_events('hide');
                    });
                }
            });
        } else if ( type == 'm' ) {
            $('.playersBox').append(`<video id="player"></video>`);

            // Inicializa o player
            jwplayer("player").setup({
                sources: [{
                    file: `${url}`,
                    'type': 'hls',
                }],
                aspectratio: '16:9',
                playbackRateControls: [0.5, 0.75, 1, 1.25, 1.5, 2],
                width: '100%',
                height: '100%',
                primary: "html5",
                abouttext: "Acesse: https://animespank.com",
                autostart: false,
                aboutlink: "https://animespank.com",
                image: `${BASE_TEMA}/img/players/p02.jpg`
            });

            jwplayer('player').addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind2" viewBox="0 0 240 240" focusable="false"><path d="m 25.993957,57.778 v 125.3 c 0.03604,2.63589 2.164107,4.76396 4.8,4.8 h 62.7 v -19.3 h -48.2 v -96.4 H 160.99396 v 19.3 c 0,5.3 3.6,7.2 8,4.3 l 41.8,-27.9 c 2.93574,-1.480087 4.13843,-5.04363 2.7,-8 -0.57502,-1.174985 -1.52502,-2.124979 -2.7,-2.7 l -41.8,-27.9 c -4.4,-2.9 -8,-1 -8,4.3 v 19.3 H 30.893957 c -2.689569,0.03972 -4.860275,2.210431 -4.9,4.9 z m 163.422413,73.04577 c -3.72072,-6.30626 -10.38421,-10.29683 -17.7,-10.6 -7.31579,0.30317 -13.97928,4.29374 -17.7,10.6 -8.60009,14.23525 -8.60009,32.06475 0,46.3 3.72072,6.30626 10.38421,10.29683 17.7,10.6 7.31579,-0.30317 13.97928,-4.29374 17.7,-10.6 8.60009,-14.23525 8.60009,-32.06475 0,-46.3 z m -17.7,47.2 c -7.8,0 -14.4,-11 -14.4,-24.1 0,-13.1 6.6,-24.1 14.4,-24.1 7.8,0 14.4,11 14.4,24.1 0,13.1 -6.5,24.1 -14.4,24.1 z m -47.77056,9.72863 v -51 l -4.8,4.8 -6.8,-6.8 13,-12.99999 c 3.02543,-3.03598 8.21053,-0.88605 8.2,3.4 v 62.69999 z"></path></svg>', 'Avan\xE7ar 10s', function() {
                jwplayer('player').seek(jwplayer('player').getPosition() + 10)
            }, 'Avan\xE7ar 10s');
            jwplayer('player').addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind" viewBox="0 0 240 240" focusable="false"><path d="M113.2,131.078a21.589,21.589,0,0,0-17.7-10.6,21.589,21.589,0,0,0-17.7,10.6,44.769,44.769,0,0,0,0,46.3,21.589,21.589,0,0,0,17.7,10.6,21.589,21.589,0,0,0,17.7-10.6,44.769,44.769,0,0,0,0-46.3Zm-17.7,47.2c-7.8,0-14.4-11-14.4-24.1s6.6-24.1,14.4-24.1,14.4,11,14.4,24.1S103.4,178.278,95.5,178.278Zm-43.4,9.7v-51l-4.8,4.8-6.8-6.8,13-13a4.8,4.8,0,0,1,8.2,3.4v62.7l-9.6-.1Zm162-130.2v125.3a4.867,4.867,0,0,1-4.8,4.8H146.6v-19.3h48.2v-96.4H79.1v19.3c0,5.3-3.6,7.2-8,4.3l-41.8-27.9a6.013,6.013,0,0,1-2.7-8,5.887,5.887,0,0,1,2.7-2.7l41.8-27.9c4.4-2.9,8-1,8,4.3v19.3H209.2A4.974,4.974,0,0,1,214.1,57.778Z"></path></svg>', 'Voltar 10s', function() {
                jwplayer('player').seek(jwplayer('player').getPosition() - 10)
            }, 'Voltar 10s');

            if (localStorage[`${episodio_id}`] == '' || localStorage[`${episodio_id}`] == 'undefined') {
	var currentPosition = 0;
} else {
	if (localStorage[`${episodio_id}`] == "null") {
		localStorage[`${episodio_id}`] = 0;
	} else {
		var currentPosition = localStorage[`${episodio_id}`];
	}
}

jwplayer().once('play',function(){
	console.log(Math.abs(jwplayer().getDuration() - currentPosition));
	if (currentPosition > 0 && Math.abs(jwplayer().getDuration() - currentPosition) > 5) {
		jwplayer().seek(currentPosition);
	}
});

window.onunload = function() {
   localStorage[`${episodio_id}`] = jwplayer().getPosition();
}

            // Esconde o loader do player
            promise_player_load().then(function() {
                resize_sidebar_navigation();
                player_load_events('hide');
            });
        } else {
            $('.playersBox').append(`<video id="player"></video>`);

            // Inicializa o player
            jwplayer("player").setup({
                sources: [{
                    file: `${url}`,
                    'type': 'mp4',
                }],
                aspectratio: '16:9',
                playbackRateControls: [0.5, 0.75, 1, 1.25, 1.5, 2],
                width: '100%',
                height: '100%',
                primary: "html5",
                abouttext: "Acesse: https://animespank.com",
                autostart: false,
                aboutlink: "https://animespank.com",
                image: `${BASE_TEMA}/img/players/p02.jpg`
            });

            jwplayer('player').addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind2" viewBox="0 0 240 240" focusable="false"><path d="m 25.993957,57.778 v 125.3 c 0.03604,2.63589 2.164107,4.76396 4.8,4.8 h 62.7 v -19.3 h -48.2 v -96.4 H 160.99396 v 19.3 c 0,5.3 3.6,7.2 8,4.3 l 41.8,-27.9 c 2.93574,-1.480087 4.13843,-5.04363 2.7,-8 -0.57502,-1.174985 -1.52502,-2.124979 -2.7,-2.7 l -41.8,-27.9 c -4.4,-2.9 -8,-1 -8,4.3 v 19.3 H 30.893957 c -2.689569,0.03972 -4.860275,2.210431 -4.9,4.9 z m 163.422413,73.04577 c -3.72072,-6.30626 -10.38421,-10.29683 -17.7,-10.6 -7.31579,0.30317 -13.97928,4.29374 -17.7,10.6 -8.60009,14.23525 -8.60009,32.06475 0,46.3 3.72072,6.30626 10.38421,10.29683 17.7,10.6 7.31579,-0.30317 13.97928,-4.29374 17.7,-10.6 8.60009,-14.23525 8.60009,-32.06475 0,-46.3 z m -17.7,47.2 c -7.8,0 -14.4,-11 -14.4,-24.1 0,-13.1 6.6,-24.1 14.4,-24.1 7.8,0 14.4,11 14.4,24.1 0,13.1 -6.5,24.1 -14.4,24.1 z m -47.77056,9.72863 v -51 l -4.8,4.8 -6.8,-6.8 13,-12.99999 c 3.02543,-3.03598 8.21053,-0.88605 8.2,3.4 v 62.69999 z"></path></svg>', 'Avan\xE7ar 10s', function() {
                jwplayer('player').seek(jwplayer('player').getPosition() + 10)
            }, 'Avan\xE7ar 10s');
            jwplayer('player').addButton('<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-rewind" viewBox="0 0 240 240" focusable="false"><path d="M113.2,131.078a21.589,21.589,0,0,0-17.7-10.6,21.589,21.589,0,0,0-17.7,10.6,44.769,44.769,0,0,0,0,46.3,21.589,21.589,0,0,0,17.7,10.6,21.589,21.589,0,0,0,17.7-10.6,44.769,44.769,0,0,0,0-46.3Zm-17.7,47.2c-7.8,0-14.4-11-14.4-24.1s6.6-24.1,14.4-24.1,14.4,11,14.4,24.1S103.4,178.278,95.5,178.278Zm-43.4,9.7v-51l-4.8,4.8-6.8-6.8,13-13a4.8,4.8,0,0,1,8.2,3.4v62.7l-9.6-.1Zm162-130.2v125.3a4.867,4.867,0,0,1-4.8,4.8H146.6v-19.3h48.2v-96.4H79.1v19.3c0,5.3-3.6,7.2-8,4.3l-41.8-27.9a6.013,6.013,0,0,1-2.7-8,5.887,5.887,0,0,1,2.7-2.7l41.8-27.9c4.4-2.9,8-1,8,4.3v19.3H209.2A4.974,4.974,0,0,1,214.1,57.778Z"></path></svg>', 'Voltar 10s', function() {
                jwplayer('player').seek(jwplayer('player').getPosition() - 10)
            }, 'Voltar 10s');

            if (localStorage[`${episodio_id}`] == '' || localStorage[`${episodio_id}`] == 'undefined') {
	var currentPosition = 0;
} else {
	if (localStorage[`${episodio_id}`] == "null") {
		localStorage[`${episodio_id}`] = 0;
	} else {
		var currentPosition = localStorage[`${episodio_id}`];
	}
}

jwplayer().once('play',function(){
	console.log(Math.abs(jwplayer().getDuration() - currentPosition));
	if (currentPosition > 0 && Math.abs(jwplayer().getDuration() - currentPosition) > 5) {
		jwplayer().seek(currentPosition);
	}
});

window.onunload = function() {
   localStorage[`${episodio_id}`] = jwplayer().getPosition();
}

            // Esconde o loader do player
            promise_player_load().then(function() {
                resize_sidebar_navigation();
                player_load_events('hide');
            });
        }
    } else {
        $('.playersBox').append(`
        <div class="playerBoxInfra">
            <iframe onload="player_load_events('hide')" src="${url}" frameborder="0" allowfullscreen></iframe>
        </div>
        `);
    }

}

// Funcao que esconde ou mostra a load do player
function player_load_events(event = 'show') {
    if ( event == 'show' ) {
        $('.playerOnLoading').show();
    } else {
        $('.playerOnLoading').slideUp();
    }
}

// Evento ao Clicar no Botao de proximo ou anterior dos controles do episodio
$('.episodioControleItem').on('click', function(e) {
    // Variaveis
    let url = $(this).attr('href');

    if ( url == '#' ) {
        e.preventDefault();
        alert('Não tem :/');
    }
});

// Geral
// Ao clicar no Icone de Menu Mobile
$('.menuIconMobile').on('click', function() {
    if ( $('.mainMenu').is(':hidden') ) {
        $('.mainMenu').slideDown().css('display', 'flex');
        $(this).addClass('active');
        events_close_button('show');
    } else {
        $('.mainMenu').slideIp();
        $(this).removeClass('active');
        events_close_button('close');
    }
});

// Exibe ou Esconde o botao de Close
function events_close_button(event) {
    if ( event == 'show' ) {
        $('.closebutton').fadeIn();
    } else {
        $('.closebutton').fadeOut();
    }
}

// Eventos ao clicar no botao de Close
$('.closebutton').on('click', function() {
    // Fecha o menu do site no mobile
    if ( $('.mainMenu').is(':visible') ) {
        $('.mainMenu').slideUp();
        events_close_button('close');
        $('.menuIconMobile').removeClass('active');
    }
});

// Slides
// Slide Letras
$('.containerLetras .mwidth').flickity({
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    prevNextButtons: false
});

// Slide Abas
$('.abasPlayersContainer').flickity({
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    prevNextButtons: false
});
