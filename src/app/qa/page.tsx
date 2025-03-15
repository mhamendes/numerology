"use client"

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useLanguage } from "(components)/language-context";

export default function QA() {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, language } = useLanguage();

  // FAQ content based on language
  const getFaqs = () => {
    if (language === "pt-br") {
      return [
        {
          question: "O que é o Mapa de Nascimento?",
          answer: (
            <div className="space-y-4">
              <p>
                O Mapa de Nascimento é um estudo numerológico profundo, baseado
                nos Sete Princípios Herméticos descritos no Kybalion, utilizando
                seu nome completo e data de nascimento. Revela padrões
                energéticos que influenciam sua jornada, trazendo clareza sobre
                sua missão de vida, desafios, talentos e ciclos importantes que
                você atravessará.
              </p>
              <p>
                Diferente do mapa astral, que é baseado na posição das estrelas
                e pode ser atualizado anualmente, o mapa de nascimento é feito
                apenas uma vez na vida, pois calcula 90 anos de existência e
                traz informações para toda a sua trajetória. O que muda ao longo
                do tempo são os anos pessoais, meses e dias, que apontam para
                energias temporárias.
              </p>
              <p>
                No mapa, você receberá informações detalhadas sobre:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Número de Motivação: Representa seus desejos mais profundos, o
                  que te impulsiona e te faz sentir realizado.
                </li>
                <li>
                  Número de Expressão e Impressão: Mostra como você se apresenta
                  ao mundo e como as pessoas te percebem.
                </li>
                <li>
                  Número do Dia de Nascimento: A energia específica do seu dia
                  de nascimento, indicando talentos naturais e desafios.
                </li>
                <li>
                  Número do Talento Oculto: Características e habilidades
                  latentes que podem ser desenvolvidas entre os 20 e 30 anos.
                </li>
                <li>
                  Número de Vibração Conjugal: A energia que governa seus
                  relacionamentos amorosos e como você lida com o amor.
                </li>
                <li>
                  Tendência Oculta: Traços de personalidade que influenciam seu
                  comportamento sem que você perceba conscientemente.
                </li>
                <li>
                  Resposta Subconsciente: Como você reage instintivamente a
                  desafios e eventos imprevistos.
                </li>
                <li>
                  Número do Destino (ou Caminho de Vida): Descreve influências
                  na personalidade, obstáculos e oportunidades que você
                  encontrará ao longo da vida. Também indica algumas
                  alternativas e seu provável resultado.
                </li>
                <li>
                  Número da Missão: O propósito maior da sua existência e as
                  tarefas e aprendizados que você veio experimentar.
                </li>
                <li>
                  Lições Kármicas: Habilidades e experiências que foram
                  negligenciadas em vidas passadas e que você precisa
                  desenvolver nesta encarnação.
                </li>
                <li>
                  Dívidas Kármicas: Estas são transgressões das Leis Universais
                  trazidas de outras vidas que precisam ser trabalhadas para sua
                  evolução espiritual.
                </li>
                <li>
                  Ciclos de Vida: As três fases principais da sua jornada
                  (Juventude, Maturidade e Velhice), cada uma com aprendizados e
                  energias específicas.
                </li>
                <li>
                  Desafios: Obstáculos que surgirão em cada ciclo e como
                  superá-los.
                </li>
                <li>
                  Momentos Decisivos: Períodos notáveis em sua trajetória que
                  trazem mudanças e transformações significativas.
                </li>
                <li>
                  Triângulo Invertido da Vida, Sequências Negativas e Arcanos:
                  Revela padrões vibracionais desafiadores e como lidar com eles
                  para evitar bloqueios energéticos e dificuldades ao longo do
                  caminho.
                </li>
                <li>
                  Anos Pessoais: Energias anuais que influenciam sua vida e que
                  serão fornecidas para os próximos 9 anos.
                </li>
                <li>
                  Meses e Dias Pessoais: Direção energética detalhada para cada
                  mês e dia, com previsões para 1 ano.
                </li>
              </ul>
            </div>
          ),
        },
        {
          question: "Por que você deveria obter seu Mapa de Nascimento?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                O mapa de nascimento é uma poderosa ferramenta para
                autoconhecimento, planejamento e evolução pessoal. Pode te
                ajudar a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Tomar decisões mais alinhadas com seu propósito de vida.
                </li>
                <li>
                  Compreender desafios e superá-los com mais consciência.
                </li>
                <li>
                  Melhorar sua relação com dinheiro, saúde e relacionamentos.
                </li>
                <li>
                  Aprimorar talentos e desenvolver habilidades ocultas.
                </li>
                <li>
                  Planejar ciclos e aproveitar oportunidades no momento certo.
                </li>
              </ul>
              <p>
                Este estudo oferece um guia completo para sua jornada,
                permitindo que você se conheça melhor e viva de forma mais
                harmoniosa e equilibrada.
              </p>
            </div>
          ),
        },
        {
          question: "Quanto tempo levará para receber meu mapa de nascimento?",
          answer: (
            <p className="text-base">
              O tempo de entrega do Mapa de Nascimento pode variar de acordo com
              a demanda e a complexidade da análise. Em média, a entrega ocorre
              dentro de 2 dias úteis após a confirmação do pagamento. No
              entanto, como sabemos o quanto seu Mapa de Nascimento impactará
              positivamente sua vida, faremos o possível para entregá-lo o mais
              rápido possível.
            </p>
          ),
        },
        {
          question:
            "Já fiz meu mapa astral. Qual é a diferença entre o mapa de nascimento e o mapa astral?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                O mapa astral é um estudo baseado na posição das estrelas no
                momento do seu nascimento e pode ser atualizado anualmente para
                analisar as energias do ano corrente, ajudando a compreender
                desafios, oportunidades e tendências para cada período.
              </p>
              <p>
                O mapa de nascimento, por outro lado, é um estudo numerológico
                profundo, feito apenas uma vez na vida, pois analisa sua
                trajetória como um todo. Na numerologia, é calculado um ciclo de
                90 anos de vida, trazendo informações sobre sua missão, desafios
                e padrões energéticos que influenciam sua jornada.
              </p>
              <p>
                O que pode mudar ao longo do tempo dentro do mapa de nascimento
                são os anos pessoais, que indicam a energia de cada ciclo anual,
                e os meses e dias pessoais, que mostram tendências mensais e
                diárias. No entanto, você receberá instruções detalhadas para um
                período de 9 anos em relação aos anos pessoais e um guia de 1
                ano para meses e dias pessoais, permitindo que você acompanhe
                suas fases e tome decisões mais alinhadas com sua energia.
              </p>
            </div>
          ),
        },
        {
          question:
            "Sou adotado e tive meu nome alterado pelos meus pais adotivos. Devo gerar meu mapa com o nome registrado pelos meus pais biológicos ou o registrado pelos meus pais adotivos?",
          answer: (
            <p className="text-base">
              Não foi por acaso que você teve dois registros de nascimento. O
              primeiro nome recebido representa seu mapa de nascimento original,
              enquanto o segundo reflete sua nova assinatura e a energia que
              você começou a carregar após a adoção. O ideal é primeiro gerar o
              mapa com o nome dado pelos seus pais biológicos, pois foi o
              primeiro registro que você recebeu no plano terreno e carrega sua
              vibração inicial. Posteriormente, quando possível, você pode
              solicitar o mapa com a nova assinatura e comparar qual ressoa mais
              com você no momento atual da sua vida.
            </p>
          ),
        },
        {
          question:
            "Estou tendo dificuldade em me encontrar profissionalmente e em permanecer no meu trabalho atual. Fazer meu mapa de nascimento me ajudará a resolver esses problemas?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                Sim! O mapa de nascimento traz informações valiosas para sua
                trajetória profissional, ajudando a identificar quais caminhos
                estão mais alinhados com sua essência. Um dos aspectos
                analisados é o Número de Motivação, que revela o que realmente
                te impulsiona. Outros números são: a Missão, que descreve sua
                essência, seu propósito de vida; o Destino que apresenta
                influências na sua personalidade, obstáculos e oportunidades que
                você encontrará ao longo da vida; e o número do Talento Oculto
                que descreve as habilidades que você pode desenvolver entre os
                20 e 30 anos.
              </p>
              <p>
                Se sua atividade profissional não estiver em sintonia com essas
                vibrações, você pode se sentir insatisfeito, desmotivado e até
                ter dificuldades em permanecer no trabalho. Esse desalinhamento
                pode gerar estresse, falta de produtividade e, em casos mais
                extremos, até problemas de saúde. Conhecendo seu mapa, você pode
                buscar atividades que ressoem com sua energia e tragam mais
                realização e estabilidade profissional.
              </p>
            </div>
          ),
        },
        {
          question:
            "O mapa de nascimento pode me ajudar a entender períodos em que preciso cuidar mais da minha saúde?",
          answer: (
            <p className="text-base">
              O mapa de nascimento pode indicar tendências energéticas que
              afetam seu bem-estar físico e emocional. Alguns números trazem uma
              maior predisposição ao estresse, ansiedade ou dificuldades em
              manter um equilíbrio energético. As Sequências Negativas
              encontradas no Triângulo Invertido e nos Arcanos do seu nome podem
              revelar como sua energia está fluindo em determinados períodos da
              vida e se existem padrões que precisam ser ajustados para evitar
              desgaste ou doenças psicossomáticas. Além disso, o Ano Pessoal
              pode apontar períodos em que é essencial cuidar melhor da saúde e
              fazer ajustes no estilo de vida.
            </p>
          ),
        },
        {
          question:
            "Meu mapa de nascimento pode indicar se tenho facilidade ou desafios na área financeira?",
          answer: (
            <p className="text-base">
              A relação com as finanças também pode ser analisada no Mapa. Os
              Números das Dívidas e Lições Kármicas também mostram desafios e
              aprendizados ligados à prosperidade. Algumas pessoas precisam
              trabalhar questões herdadas e crenças limitantes sobre dinheiro,
              enquanto outras têm facilidade em atrair recursos financeiros mas
              enfrentam dificuldades em administrá-los. O Mapa traz quais
              comportamentos podem estar impedindo seu crescimento financeiro e
              diretrizes que, se seguidas, tendem a trazer mais estabilidade
              nessa área.
            </p>
          ),
        },
        {
          question:
            "Meu mapa de nascimento pode me ajudar a entender meus padrões de relacionamento?",
          answer: (
            <p className="text-base">
              No campo afetivo e interpessoal, o Número de Vibração Conjugal
              revela como você se expressa nos relacionamentos e o que busca nas
              conexões emocionais. Algumas combinações numéricas indicam
              facilidade em construir vínculos duradouros, enquanto outras podem
              mostrar desafios como dependência emocional, necessidade de
              liberdade ou dificuldades de comunicação. O Número do Ano Pessoal
              também pode indicar momentos de transformação nos relacionamentos,
              apontando se é um período de construção, aprendizado ou
              encerramento de ciclos.
            </p>
          ),
        },
        {
          question:
            "Recebi meu mapa, mas não me reconheci nele. O que aconteceu?",
          answer: (
            <p className="text-base">
              Se você não se identificou com seu Mapa de Nascimento, pode ter
              ocorrido um erro no preenchimento dos seus dados. Recomendamos que
              você verifique sua certidão de nascimento e confirme se escreveu
              corretamente seu nome completo e data de nascimento ao fazer a
              solicitação. Se encontrar algum erro, entre em contato conosco
              pelo email contact@cosmicnumbers.com para analisarmos a situação e
              corrigirmos se necessário.
            </p>
          ),
        },
      ];
    } else if (language === "it") {
      return [
        {
          question: "Che cos'è la Mappa di Nascita?",
          answer: (
            <div className="space-y-4">
              <p>
                La Mappa di Nascita è uno studio numerologico profondo, basato
                sui Sette Principi Ermetici descritti nel Kybalion, utilizzando
                il tuo nome completo e la data di nascita. Rivela modelli
                energetici che influenzano il tuo viaggio, portando chiarezza
                sulla tua missione di vita, sfide, talenti e cicli importanti
                che attraverserai.
              </p>
              <p>
                A differenza della mappa astrale, che si basa sulla posizione
                delle stelle e può essere aggiornata annualmente, la mappa di
                nascita viene fatta solo una volta nella vita, poiché calcola 90
                anni di esistenza e porta informazioni per l'intera traiettoria.
                Ciò che cambia nel tempo sono gli anni personali, i mesi e i
                giorni, che indicano energie temporanee.
              </p>
              <p>
                Nella mappa, riceverai informazioni dettagliate su:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Numero di Motivazione: Rappresenta i tuoi desideri più
                  profondi, ciò che ti spinge e ti fa sentire realizzato.
                </li>
                <li>
                  Numero di Espressione e Impressione: Mostra come ti presenti
                  al mondo e come le persone ti percepiscono.
                </li>
                <li>
                  Numero del Giorno di Nascita: L'energia specifica del tuo
                  giorno di nascita, che indica talenti naturali e sfide.
                </li>
                <li>
                  Numero del Talento Nascosto: Caratteristiche e abilità latenti
                  che possono essere sviluppate tra i 20 e i 30 anni.
                </li>
                <li>
                  Numero di Vibrazione Coniugale: L'energia che governa le tue
                  relazioni amorose e come affronti l'amore.
                </li>
                <li>
                  Tendenza Nascosta: Tratti della personalità che influenzano il
                  tuo comportamento senza che tu ne sia consapevole.
                </li>
                <li>
                  Risposta Subconscia: Come reagisci istintivamente alle sfide e
                  agli eventi imprevisti.
                </li>
                <li>
                  Numero del Destino (o Percorso di Vita): Descrive le influenze
                  sulla personalità, gli ostacoli e le opportunità che
                  incontrerai durante la vita. Indica anche alcune alternative e
                  il loro probabile risultato.
                </li>
                <li>
                  Numero della Missione: Lo scopo più grande della tua esistenza
                  e i compiti e gli apprendimenti che sei venuto a sperimentare.
                </li>
                <li>
                  Lezioni Karmiche: Abilità ed esperienze che sono state
                  trascurate nelle vite passate e che devi sviluppare in questa
                  incarnazione.
                </li>
                <li>
                  Debiti Karmici: Queste sono trasgressioni delle Leggi
                  Universali portate da altre vite che devono essere elaborate
                  per la tua evoluzione spirituale.
                </li>
                <li>
                  Cicli di Vita: Le tre fasi principali del tuo viaggio
                  (Giovinezza, Maturità e Vecchiaia), ciascuna con apprendimenti
                  ed energie specifiche.
                </li>
                <li>
                  Sfide: Ostacoli che sorgeranno in ogni ciclo e come superarli.
                </li>
                <li>
                  Momenti Decisivi: Periodi notevoli nella tua traiettoria che
                  portano cambiamenti e trasformazioni significative.
                </li>
                <li>
                  Triangolo Invertito della Vita, Sequenze Negative e Arcani:
                  Rivela modelli vibrazionali impegnativi e come affrontarli per
                  evitare blocchi energetici e difficoltà lungo il percorso.
                </li>
                <li>
                  Anni Personali: Energie annuali che influenzano la tua vita e
                  che saranno fornite per i prossimi 9 anni.
                </li>
                <li>
                  Mesi e Giorni Personali: Direzione energetica dettagliata per
                  ogni mese e giorno, con previsioni per 1 anno.
                </li>
              </ul>
            </div>
          ),
        },
        {
          question: "Perché dovresti ottenere la tua Mappa di Nascita?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                La mappa di nascita è un potente strumento per la conoscenza di
                sé, la pianificazione e l'evoluzione personale. Può aiutarti a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Prendere decisioni più allineate con il tuo scopo di vita.
                </li>
                <li>
                  Comprendere le sfide e superarle con maggiore consapevolezza.
                </li>
                <li>
                  Migliorare il tuo rapporto con il denaro, la salute e le
                  relazioni.
                </li>
                <li>
                  Migliorare i talenti e sviluppare abilità nascoste.
                </li>
                <li>
                  Pianificare i cicli e sfruttare le opportunità al momento
                  giusto.
                </li>
              </ul>
              <p>
                Questo studio offre una guida completa per il tuo viaggio,
                permettendoti di conoscerti meglio e vivere in modo più
                armonioso ed equilibrato.
              </p>
            </div>
          ),
        },
        {
          question:
            "Quanto tempo ci vorrà per ricevere la mia mappa di nascita?",
          answer: (
            <p className="text-base">
              Il tempo di consegna della Mappa di Nascita può variare in base
              alla domanda e alla complessità dell'analisi. In media, la
              consegna avviene entro 2 giorni lavorativi dopo la conferma del
              pagamento. Tuttavia, poiché sappiamo quanto la tua Mappa di
              Nascita influenzerà positivamente la tua vita, faremo del nostro
              meglio per fartela avere il prima possibile.
            </p>
          ),
        },
        {
          question:
            "Ho già fatto la mia mappa astrale. Qual è la differenza tra la mappa di nascita e la mappa astrale?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                La mappa astrale è uno studio basato sulla posizione delle
                stelle al momento della tua nascita e può essere aggiornata
                annualmente per analizzare le energie dell'anno corrente,
                aiutando a comprendere sfide, opportunità e tendenze per ogni
                periodo.
              </p>
              <p>
                La mappa di nascita, d'altra parte, è uno studio numerologico
                profondo, fatto solo una volta nella vita, poiché analizza la
                tua traiettoria nel suo complesso. In numerologia, viene
                calcolato un ciclo di 90 anni di vita, portando informazioni
                sulla tua missione, sfide e modelli energetici che influenzano
                il tuo viaggio.
              </p>
              <p>
                Ciò che può cambiare nel tempo all'interno della mappa di
                nascita sono gli anni personali, che indicano l'energia di ogni
                ciclo annuale, e i mesi e giorni personali, che mostrano le
                tendenze mensili e giornaliere. Tuttavia, riceverai istruzioni
                dettagliate per un periodo di 9 anni in relazione agli anni
                personali e una guida di 1 anno per mesi e giorni personali,
                permettendoti di seguire le tue fasi e prendere decisioni più
                allineate con la tua energia.
              </p>
            </div>
          ),
        },
        {
          question:
            "Sono stato adottato e il mio nome è stato cambiato dai miei genitori adottivi. Dovrei generare la mia mappa con il nome registrato dai miei genitori biologici o quello registrato dai miei genitori adottivi?",
          answer: (
            <p className="text-base">
              Non è stato un caso che tu abbia avuto due registrazioni di
              nascita. Il primo nome ricevuto rappresenta la tua mappa di
              nascita originale, mentre il secondo riflette la tua nuova firma e
              l'energia che hai iniziato a portare dopo l'adozione. L'ideale è
              generare prima la mappa con il nome dato dai tuoi genitori
              biologici, poiché è stata la prima registrazione che hai ricevuto
              sul piano terreno e porta la tua vibrazione iniziale.
              Successivamente, quando possibile, puoi richiedere la mappa con la
              nuova firma e confrontare quale risuona di più con te nel momento
              attuale della tua vita.
            </p>
          ),
        },
        {
          question:
            "Ho difficoltà a trovare me stesso professionalmente e a rimanere nel mio lavoro attuale. Fare la mia mappa di nascita mi aiuterà a risolvere questi problemi?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                Sì! La mappa di nascita porta informazioni preziose per la tua
                traiettoria professionale, aiutando a identificare quali
                percorsi sono più allineati con la tua essenza. Uno degli
                aspetti analizzati è il Numero di Motivazione, che rivela ciò
                che ti spinge davvero. Altri numeri sono: la Missione, che
                descrive la tua essenza, il tuo scopo di vita; il Destino che
                presenta influenze sulla tua personalità, ostacoli e opportunità
                che incontrerai durante la vita; e il numero del Talento
                Nascosto che descrive le abilità che puoi sviluppare tra i 20 e
                i 30 anni.
              </p>
              <p>
                Se la tua attività professionale non è in sintonia con queste
                vibrazioni, potresti sentirti insoddisfatto, demotivato e
                persino avere difficoltà a rimanere al lavoro. Questo
                disallineamento può generare stress, mancanza di produttività e,
                nei casi più estremi, persino problemi di salute. Conoscendo la
                tua mappa, puoi cercare attività che risuonino con la tua
                energia e portino più realizzazione e stabilità professionale.
              </p>
            </div>
          ),
        },
        {
          question:
            "La mappa di nascita può aiutarmi a capire i periodi in cui devo prendermi più cura della mia salute?",
          answer: (
            <p className="text-base">
              La mappa di nascita può indicare tendenze energetiche che
              influenzano il tuo benessere fisico ed emotivo. Alcuni numeri
              portano una maggiore predisposizione allo stress, all'ansia o
              difficoltà nel mantenere un equilibrio energetico. Le Sequenze
              Negative trovate nel Triangolo Invertito e negli Arcani del tuo
              nome possono rivelare come la tua energia sta fluendo in
              determinati periodi della vita e se ci sono modelli che devono
              essere aggiustati per evitare usura o malattie psicosomatiche.
              Inoltre, l'Anno Personale può indicare periodi in cui è essenziale
              prendersi più cura della salute e apportare modifiche allo stile
              di vita.
            </p>
          ),
        },
        {
          question:
            "La mia mappa di nascita può indicare se ho facilità o sfide nell'area finanziaria?",
          answer: (
            <p className="text-base">
              Il rapporto con le finanze può essere analizzato anche nella
              Mappa. I Numeri dei Debiti e delle Lezioni Karmiche mostrano anche
              sfide e apprendimenti legati alla prosperità. Alcune persone
              devono lavorare su problemi ereditati e credenze limitanti sul
              denaro, mentre altre hanno facilità nell'attrarre risorse
              finanziarie ma affrontano difficoltà nel gestirle. La Mappa porta
              quali comportamenti potrebbero impedire la tua crescita
              finanziaria e linee guida che, se seguite, tendono a portare più
              stabilità in quest'area.
            </p>
          ),
        },
        {
          question:
            "La mia mappa di nascita può aiutarmi a capire i miei modelli di relazione?",
          answer: (
            <p className="text-base">
              Nel campo affettivo e interpersonale, il Numero di Vibrazione
              Coniugale rivela come ti esprimi nelle relazioni e cosa cerchi
              nelle connessioni emotive. Alcune combinazioni numeriche indicano
              facilità nel costruire legami duraturi, mentre altre possono
              mostrare sfide come dipendenza emotiva, bisogno di libertà o
              difficoltà di comunicazione. Il Numero dell'Anno Personale può
              anche indicare momenti di trasformazione nelle relazioni,
              indicando se è un periodo di costruzione, apprendimento o fine dei
              cicli.
            </p>
          ),
        },
        {
          question:
            "Ho ricevuto la mia mappa, ma non mi sono riconosciuto in essa. Cosa è successo?",
          answer: (
            <p className="text-base">
              Se non ti sei identificato con la tua Mappa di Nascita, potrebbe
              esserci stato un errore nella compilazione dei tuoi dati. Ti
              consigliamo di controllare il tuo certificato di nascita e
              verificare di aver scritto correttamente il tuo nome completo e la
              data di nascita quando hai fatto la richiesta. Se trovi qualche
              errore, contattaci via email a contact@cosmicnumbers.com per
              analizzare la situazione e correggerla se necessario.
            </p>
          ),
        },
      ];
    } else {
      // Default English FAQs
      return [
        {
          question: "What is the Birth Map?",
          answer: (
            <div className="space-y-4">
              <p>
                The Birth Map is a deep numerological study, based on the Seven
                Hermetic Principles described in The Kybalion, using your full
                name and birth date. It reveals energy patterns that influence
                your journey, bringing clarity about your life mission,
                challenges, talents, and important cycles you'll go through.
              </p>
              <p>
                Unlike the astral map, which is based on the position of the
                stars and can be updated annually, the birth map is made only
                once in a lifetime, as it calculates 90 years of existence and
                brings information for your entire trajectory. What changes over
                time are the personal years, months, and days, which point to
                temporary energies.
              </p>
              <p>
                In the map, you will receive detailed information about:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Motivation Number: Represents your deepest desires, what
                  drives you and makes you feel fulfilled.
                </li>
                <li>
                  Expression and Impression Number: Shows how you present
                  yourself to the world and how people perceive you.
                </li>
                <li>
                  Birth Day Number: The specific energy of your birth day,
                  indicating natural talents and challenges.
                </li>
                <li>
                  Hidden Talent Number: Latent characteristics and abilities
                  that can be developed between the ages of 20 and 30.
                </li>
                <li>
                  Conjugal Vibration Number: The energy that governs your love
                  relationships and how you deal with love.
                </li>
                <li>
                  Hidden Tendency: Personality traits that influence your
                  behavior without you consciously realizing it.
                </li>
                <li>
                  Subconscious Response: How you instinctively react to
                  challenges and unforeseen events.
                </li>
                <li>
                  Destiny Number (or Life Path): Describes influences on
                  personality, obstacles, and opportunities you will encounter
                  throughout life. It also indicates some alternatives and their
                  likely outcome.
                </li>
                <li>
                  Mission Number: The greater purpose of your existence and the
                  tasks and learnings you came to experience.
                </li>
                <li>
                  Karmic Lessons: Skills and experiences that were neglected in
                  past lives and that you need to develop in this incarnation.
                </li>
                <li>
                  Karmic Debts: These are transgressions of Universal Laws
                  brought from other lives that need to be worked on for your
                  spiritual evolution.
                </li>
                <li>
                  Life Cycles: The three major phases of your journey (Youth,
                  Maturity, and Old Age), each with specific learnings and
                  energies.
                </li>
                <li>
                  Challenges: Obstacles that will arise in each cycle and how to
                  overcome them.
                </li>
                <li>
                  Decisive Moments: Remarkable periods in your trajectory that
                  bring significant changes and transformations.
                </li>
                <li>
                  Inverted Triangle of Life, Negative Sequences, and Arcana:
                  Reveals challenging vibrational patterns, and how to deal with
                  them to avoid energy blockages and difficulties along the way.
                </li>
                <li>
                  Personal Years: Annual energies that influence your life and
                  that will be provided for the next 9 years.
                </li>
                <li>
                  Personal Months and Days: Detailed energy direction for each
                  month and day, with forecasts for 1 year.
                </li>
              </ul>
            </div>
          ),
        },
        {
          question: "Why should you get your Birth Map?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                The birth map is a powerful tool for self-knowledge, planning,
                and personal evolution. It can help you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Make decisions more aligned with your life purpose.
                </li>
                <li>
                  Understand challenges and overcome them with more awareness.
                </li>
                <li>
                  Improve your relationship with money, health, and
                  relationships.
                </li>
                <li>
                  Enhance talents and develop hidden abilities.
                </li>
                <li>
                  Plan cycles and take advantage of opportunities at the right
                  time.
                </li>
              </ul>
              <p>
                This study offers a complete guide for your journey, allowing
                you to know yourself better and live in a more harmonious and
                balanced way.
              </p>
            </div>
          ),
        },
        {
          question: "How long will it take to receive my birth map?",
          answer: (
            <p className="text-base">
              The delivery time for the Birth Map may vary according to demand
              and the complexity of the analysis. On average, delivery occurs
              within 2 business days after payment confirmation. However, as we
              know how much your Birth Map will positively impact your life, we
              will do our best to get it to you as soon as possible.
            </p>
          ),
        },
        {
          question:
            "I've already done my astral map. What's the difference between the birth map and the astral map?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                The astral map is a study based on the position of the stars at
                the time of your birth and can be updated annually to analyze
                the energies of the current year, helping to understand
                challenges, opportunities, and trends for each period.
              </p>
              <p>
                The birth map, on the other hand, is a deep numerological study,
                made only once in a lifetime, as it analyzes your trajectory as
                a whole. In numerology, a cycle of 90 years of life is
                calculated, bringing information about your mission, challenges,
                and energy patterns that influence your journey.
              </p>
              <p>
                What can change over time within the birth map are the personal
                years, which indicate the energy of each annual cycle, and the
                personal months and days, which show monthly and daily trends.
                However, you will receive detailed instructions for a period of
                9 years in relation to personal years and a 1-year guide for
                personal months and days, allowing you to follow your phases and
                make decisions more aligned with your energy.
              </p>
            </div>
          ),
        },
        {
          question:
            "I am adopted and had my name changed by my adoptive parents. Should I generate my map with the name registered by my biological parents or the one registered by my adoptive parents?",
          answer: (
            <p className="text-base">
              It was not by chance that you had two birth registrations. The
              first name received represents your original birth map, while the
              second reflects your new signature and the energy you started to
              carry after adoption. The ideal is to first generate the map with
              the name given by your biological parents, as it was the first
              record you received on the earthly plane and carries your initial
              vibration. Later, when possible, you can request the map with the
              new signature and compare which one resonates more with you at the
              current moment of your life.
            </p>
          ),
        },
        {
          question:
            "I'm having trouble finding myself professionally and staying in my current job. Will doing my birth map help me solve these problems?",
          answer: (
            <div className="space-y-4 text-base">
              <p>
                Yes! The birth map brings valuable information for your
                professional trajectory, helping to identify which paths are
                more aligned with your essence. One of the aspects analyzed is
                the Motivation Number, which reveals what really drives you.
                Other numbers are: the Mission, which describes your essence,
                your life purpose; the Destiny that presents influences on your
                personality, obstacles, and opportunities you will encounter
                throughout life; and the Hidden Talent number that describes the
                skills you can develop between the ages of 20 and 30.
              </p>
              <p>
                If your professional activity is not in tune with these
                vibrations, you may feel dissatisfied, unmotivated, and even
                have difficulties staying at work. This misalignment can
                generate stress, lack of productivity, and, in more extreme
                cases, even health problems. By knowing your map, you can seek
                activities that resonate with your energy and bring more
                fulfillment and professional stability.
              </p>
            </div>
          ),
        },
        {
          question:
            "Can the birth map help me understand periods when I need to take better care of my health?",
          answer: (
            <p className="text-base">
              The birth map can indicate energy trends that affect your physical
              and emotional well-being. Some numbers bring a greater
              predisposition to stress, anxiety, or difficulties in maintaining
              an energy balance. The Negative Sequences found in the Inverted
              Triangle and in the Arcana of your name can reveal how your energy
              is flowing in certain periods of life and if there are patterns
              that need to be adjusted to avoid wear or psychosomatic diseases.
              In addition, the Personal Year can point to periods when it is
              essential to take better care of health and make adjustments to
              lifestyle.
            </p>
          ),
        },
        {
          question:
            "Can my birth map indicate if I have ease or challenges in the financial area?",
          answer: (
            <p className="text-base">
              The relationship with finances can also be analyzed in the Map.
              The Numbers of Debts and Karmic Lessons also show challenges and
              learnings linked to prosperity. Some people need to work on
              inherited issues and limiting beliefs about money, while others
              have an ease of attracting financial resources but face
              difficulties in managing them. The Map brings which behaviors may
              be preventing your financial growth and guidelines that, if
              followed, tend to bring more stability in this area.
            </p>
          ),
        },
        {
          question:
            "Can my birth map help me understand my relationship patterns?",
          answer: (
            <p className="text-base">
              In the affective and interpersonal field, the Conjugal Vibration
              Number reveals how you express yourself in relationships and what
              you seek in emotional connections. Some numerical combinations
              indicate ease in building lasting bonds, while others may show
              challenges such as emotional dependence, need for freedom, or
              communication difficulties. The Personal Year Number can also
              indicate moments of transformation in relationships, pointing out
              whether it is a period of construction, learning, or ending
              cycles.
            </p>
          ),
        },
        {
          question:
            "I received my map, but I didn't recognize myself in it. What happened?",
          answer: (
            <p className="text-base">
              If you didn't identify with your Birth Map, there may have been an
              error in filling out your data. We recommend that you check your
              birth certificate and verify that you wrote your full name and
              date of birth correctly when requesting. If you find any mistake,
              contact us by email at contact@cosmicnumbers.com to analyze the
              situation and correct it if necessary.
            </p>
          ),
        },
      ];
    }
  };

  const faqs = getFaqs();

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof faq.answer.props.children === "string" &&
        faq.answer.props.children
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (Array.isArray(faq.answer.props.children) &&
        faq.answer.props.children.some(
          (child) =>
            typeof child === "object" &&
            child.props &&
            child.props.children &&
            (typeof child.props.children === "string"
              ? child.props.children
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              : Array.isArray(child.props.children) &&
                child.props.children.some(
                  (grandchild) =>
                    typeof grandchild === "string" &&
                    grandchild.toLowerCase().includes(searchTerm.toLowerCase()),
                )),
        )),
  );

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("frequentlyAskedQuestions")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("qaDescription")}
          </p>
        </div>

        <div className="mb-8 relative">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />

          <Input
            type="text"
            placeholder={t("searchQuestions")}
            className="pl-10 border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              id={`2jfvm1_${index}`}
            >
              <AccordionTrigger
                className="text-left text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium text-lg md:text-lg"
                id={`g0188c_${index}`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-gray-600 dark:text-gray-300"
                id={`flb237_${index}`}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("noQuestionsFound")}
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
            >
              {t("clearSearch")}
            </Button>
          </div>
        )}

        <div
          className="mt-12 text-center p-6 bg-indigo-50 dark:bg-gray-800 rounded-lg"
        >
          <h3
            className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
          >
            {t("stillHaveQuestions")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("cantFindAnswer")}
          </p>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {t("contactUs")}
          </Button>
        </div>
      </div>
    </div>
  );
}
