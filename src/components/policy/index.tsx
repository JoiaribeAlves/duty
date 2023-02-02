import { Helmet } from "react-helmet";

import { Layout } from "../Layout";

import styles from "./Styles.module.scss";

export function Policy() {
	return (
		<>
			<Helmet>
				<title>Política de Privacidade | Plantão de Farmácia</title>
			</Helmet>
			<Layout>
				<p className={styles.header}>
					Seja bem-vindo ao nosso site. Leia com atenção nossa Política de
					Privacidade.
				</p>

				<section className={styles.policy}>
					<p>
						Nesta Política de Privacidade, vamos explicar aos nossos visitantes
						e usuários, todas as formas e meios que protegemos e tratamos os
						dados coletados em nossa plataforma.
					</p>

					<p>
						Nós levamos extremamente a sério a proteção dos dados pessoais
						coletados e armazenados, e neste documento, vamos te explicar
						detalhadamente como e porque fazemos esta coleta, e como você pode
						pedir para retirar, alterar ou excluir seus dados de nossos
						servidores.
					</p>

					<p>
						Em caso de dúvidas de quaisquer tipos, você pode entrar em contato
						diretamente com nossa equipe pelo email de contato.
					</p>

					<p>
						Este documento foi criado pelo Advogado{" "}
						<a href="https://diegocastro.adv.br" target="_blank">
							Diego Castro
						</a>{" "}
						(OAB/PI 15.613), e adaptado para utilização neste website.
					</p>

					<article>
						<h2>1. Sobre a Origem dos seus dados Pessoais</h2>
						<p>
							Nosso site pode coletar alguns dados pessoais seus para diferentes
							objetivos. Para coletarmos estes dados, usamos as seguintes
							tecnologias:
						</p>

						<ul>
							<li>
								<span>Website</span>: Dentro do nosso site você poderá preencher
								formulários, enviar comentários e dúvidas, entrar em contato com
								nossa equipe ou se cadastrar na nossa plataforma, e seus dados
								serão salvos para posterior atendimento.
							</li>
							<li>
								<span>Mensagens e comunicações</span>: Quando você se comunica
								com nossa equipe, seja pelo Whatsapp, por SMS, por E-mail ou
								quaisquer outros tipos de chat, alguns dados podem ficar salvos
								para futura conferência e facilitar a comunicação com nossos
								clientes e usuários.
							</li>
						</ul>
					</article>

					<article>
						<h2>2. Como e porque coletamos seus dados</h2>
						<p>
							É importante que você, nosso usuário ou visitante, saiba como e
							quais dados pessoais coletamos e utilizamos quando você visita
							nosso site. Destacamos que sempre tentamos coletar o mínimo de
							dados possíveis para sua maior segurança, porém, alguns dados são
							essenciais para podermos entregar o melhor serviço possível e até
							para o funcionamento do site, conforme descrevemos abaixo:
						</p>
						<ul>
							<li>
								<span>Navegação ao Site</span>: quando você navega pelo nosso
								site, coletamos automaticamente dados como o seu endereço IP,
								tipo de navegador, páginas acessadas, tempo gasto em cada página
								e outras informações.
							</li>
							<li>
								<span>Informações de contato</span>: quando você entra em
								contato conosco por e-mail ou telefone, coletamos as suas
								informações de contato, como o seu nome, e-mail, número de
								telefone e a mensagem que você nos enviou.
							</li>
							<li>
								<span>Informações de localização</span>: quando você usa os
								nossos serviços, coletamos dados de localização para saber de
								qual cidade você está acessando nosso website, assim podemos
								mostrar as informações de acordo com a cidade.
							</li>
						</ul>
					</article>

					<article>
						<h2>3. Sobre o uso de Cookies</h2>
						<p>
							Usamos cookies no nosso website e aplicativos para melhorar a sua
							experiência de navegação no nosso website. Um cookie é um pequeno
							arquivo de texto que um site armazena no seu computador ou
							dispositivo móvel quando você visita o site.
						</p>
						<p>
							Os cookies nos permitem reconhecer o seu navegador e fornecer-lhe
							a melhor experiência ao navegar no nosso site. Além disso, os
							cookies nos ajudam a compreender quais seções do site são mais
							interessantes para você e quais conteúdos podem ser recomendados
							para você.
						</p>

						<p>
							Você pode a qualquer momento bloquear os cookies no seu navegador,
							ou limpar o cache para retirar os mesmos.
						</p>

						<p>
							É importante destacar que tentamos minimizar o uso de cookies não
							essenciais, mas utilizamos os necessários para entregar um melhor
							serviço, conforme a previsão de legítimo interesse na LGPD. Você
							pode a qualquer momento desativar os mesmos em seu navegador.
						</p>
					</article>

					<article>
						<h2>4. Com quem compartilhamos seus Dados Pessoais</h2>
						<p>
							Não compartilhamos dados pessoais de nossos visitantes, exceto por
							ordem judicial.
						</p>
					</article>

					<article>
						<h2>5. Sobre seus Direitos em relação aos Dados coletados</h2>
						<p>
							O presente texto tem por objetivo esclarecer os nossos leitores e
							visitantes sobre quais são os seus direitos em relação aos dados
							pessoais.
						</p>

						<p>
							De acordo com a{" "}
							<a
								href="http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
								target="_blank"
							>
								Lei Geral de Proteção de Dados Pessoais
							</a>{" "}
							(LGPD), toda pessoa tem o direito à informação, à transparência, à
							liberdade e à autonomia na tomada de decisões.
						</p>

						<p>
							Com relação aos dados pessoais, a pessoa tem o direito ao acesso,
							à correção, à eliminação, à portabilidade, à limitação do
							tratamento e à oposição.
						</p>

						<p>
							A pessoa também tem o direito de negas a qualquer momento que seus
							dados pessoais sejam utilizados para fins de marketing e ao
							recebimento de comunicações comerciais.
						</p>

						<p>
							Para exercer os seus direitos, basta entrar em contato com a nossa
							equipe.
						</p>

						<p>
							Esclarecemos que os dados pessoais são tratados de forma
							confidencial e que tomamos todas e quaisquer medidas de segurança
							necessárias para garantir a proteção dos dados.
						</p>
					</article>

					<article>
						<h2>
							6. Sobre a segurança que aplicamos no tratamento dos seus dados
						</h2>
						<p>
							A segurança é um dos pilares fundamentais da nossa política de
							privacidade.
						</p>
						<p>
							Todos os dados pessoais que você fornecer ao site serão tratados
							com total confidencialidade e segurança, de acordo com as normas
							legais aplicáveis.
						</p>
						<p>
							Para garantir a proteção dos seus dados pessoais, o site utiliza
							diversas medidas de segurança, como por exemplo:
						</p>
						<ul>
							<li>Criptografia SSL (Secure Socket Layer);</li>
							<li>Firewalls;</li>
							<li>Sistemas de detecção de invasões;</li>
							<li>Monitoramento constante das redes;</li>
							<li>Uso de senhas seguras;</li>
							<li>Verificação periódica da segurança dos sistemas.</li>
						</ul>
						<p>
							Todas as informações pessoais são armazenadas em servidores
							seguros, protegidos contra acessos não autorizados, utilizando os
							mais modernos e avançados sistemas de segurança.
						</p>
						<p>
							Nossa equipe de segurança está constantemente monitorando os
							sistemas e atualizando as medidas de proteção, para garantir que
							seus dados estejam sempre seguros.
						</p>
						<p>
							Caso você tenha alguma dúvida ou preocupação em relação à
							segurança dos seus dados pessoais, entre em contato conosco.
						</p>
					</article>

					<article>
						<h2>7. Pedido de modificação, remoção ou alteração</h2>

						<p>
							Entendemos que você possa, eventualmente, querer modificar,
							remover ou alterar seus dados pessoais.
						</p>

						<p>
							Se você deseja fazer uma alteração, uma remoção ou uma
							modificação, entre em contato conosco e nós faremos o possível
							para atender à sua solicitação. No entanto, tenha em mente que, em
							alguns casos, pode não ser possível atender à sua solicitação,
							especialmente se for necessária para cumprir nossas obrigações
							legais ou contratuais.
						</p>

						<p>
							Além disso, lembre-se de que, se você solicitar a remoção de seus
							dados pessoais do nossos banco de dados, isso pode afetar o uso de
							nosso site e serviços. Se você não puder fazer uma alteração ou
							uma modificação, ou se desejar excluir seus dados pessoais, entre
							em contato conosco para podermos discutir outras opções.
						</p>
					</article>
				</section>
			</Layout>
		</>
	);
}
