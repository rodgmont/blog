export const PORTFOLIO_DATA = {
  en: [
    {
      id: 'ai',
      theme: 'AI Engineering',
      accent: '#3b82f6',
      projects: [
        { id: 'obelysk', title: 'Obelysk', subtitle: 'Cognitive infrastructure and SLMs for Latin America.', image: '/images/sml-hero.jpg', date: 'May 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['AI Engineering', 'LLMOps', 'Infrastructure'], link: 'https://www.obelysk.tech/', body: 'Architecting and building the core infrastructure for deploying small language models (SLMs) tailored for resource-constrained environments. The focus is on lowering inference latency and making advanced AI accessible across Latin America.' },
        { id: 'haiku', title: 'HAIKU', subtitle: 'AI-powered adaptive learning engine.', image: '/images/obelysk-hero.jpg', date: 'Apr 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Machine Learning', 'EdTech'], link: '#', body: 'An adaptive learning platform combining educational pedagogy with personalized ML models. Dynamically adjusts curriculum difficulty based on real-time student performance data.' },
        { id: 'slm-eval', title: 'SLM Eval Suite', subtitle: 'Evaluation framework for small language models in low-resource languages.', image: '/images/sml-hero.jpg', date: 'Mar 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['AI Research', 'Evaluation'], link: '#', body: 'A benchmarking framework designed to evaluate small language models on Spanish and indigenous Latin American languages, addressing the gap in non-English NLP evaluation.' },
        { id: 'osi-proto', title: 'OSI Prototype', subtitle: 'Early-stage research on Organic Superintelligence architecture.', image: '/images/obelysk-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['AI Research', 'Systems'], link: '#', body: 'Theoretical and experimental work on combining AI cognition with robotic embodiment. Exploring perception-decision-action loops in physical environments.' },
        { id: 'inference-engine', title: 'Inference Engine', subtitle: 'Optimized inference runtime for transformer models on edge hardware.', image: '/images/sml-hero.jpg', date: 'Jan 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Systems', 'C++', 'ML'], link: '#', body: 'A custom inference runtime optimized for running transformer-based models on constrained edge hardware, achieving up to 3x latency reduction versus vanilla HuggingFace.' },
      ],
    },
    {
      id: 'engineering',
      theme: 'Software Engineering',
      accent: '#f59e0b',
      projects: [
        { id: 'analytics-pipeline', title: 'Analytics Pipeline', subtitle: 'High-throughput on-chain data processing system.', image: '/images/obelysk-hero.jpg', date: 'Mar 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Data Engineering', 'Go'], link: '#', body: 'A high-throughput data pipeline to process and analyze on-chain data in real-time, applying heuristic-based anomaly detection algorithms to identify specific transaction patterns.' },
        { id: 'api-gateway', title: 'API Gateway', subtitle: 'High-performance reverse proxy with rate limiting and auth.', image: '/images/sml-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Backend', 'Go', 'Distributed'], link: '#', body: 'A production-grade API gateway built in Go, featuring JWT authentication, per-client rate limiting, request tracing, and health monitoring across microservices.' },
        { id: 'redis-cache', title: 'Distributed Cache Layer', subtitle: 'Redis-backed caching strategy for ML model outputs.', image: '/images/obelysk-hero.jpg', date: 'Jan 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Backend', 'Redis', 'Systems'], link: '#', body: 'A distributed caching layer built on Redis that stores and serves ML inference results, reducing redundant computation for identical inputs by over 90%.' },
        { id: 'blog-platform', title: 'This Blog', subtitle: 'Personal publishing platform built with Next.js and MDX.', image: '/images/sml-hero.jpg', date: 'Dec 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['Next.js', 'MDX', 'Frontend'], link: 'https://franrodgmont.com', body: 'A minimal, fast personal blog built with Next.js App Router and MDX content. Features bilingual support (EN/ES), view counting with Redis, and a scroll-spy article layout.' },
        { id: 'cli-tools', title: 'Dev CLI Toolkit', subtitle: 'Command-line utilities for AI engineering workflows.', image: '/images/obelysk-hero.jpg', date: 'Nov 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['CLI', 'Python', 'Tooling'], link: 'https://github.com/rodgmont', body: 'A collection of CLI tools for managing ML experiments, parsing model outputs, converting dataset formats, and automating deployment steps in AI engineering pipelines.' },
      ],
    },
    {
      id: 'opensource',
      theme: 'Open Source',
      accent: '#10b981',
      projects: [
        { id: 'ai-optimization', title: 'AI Model Optimization', subtitle: 'Quantization tools for transformer models.', image: '/images/sml-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'PyTorch'], link: 'https://github.com/rodgmont', body: 'Contributions to open-source libraries focused on quantizing and fine-tuning transformer models. Improved documentation and added hardware architecture support.' },
        { id: 'mdx-components', title: 'MDX Component Library', subtitle: 'Reusable React components for MDX-based publishing.', image: '/images/obelysk-hero.jpg', date: 'Jan 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'React', 'MDX'], link: 'https://github.com/rodgmont', body: 'A set of reusable, accessible React components designed for MDX-based content publishing, including scroll-spy navigation, article sections, and citation formatting.' },
        { id: 'nextjs-i18n', title: 'Next.js i18n Middleware', subtitle: 'Cookie-based locale detection without next-intl dependency.', image: '/images/sml-hero.jpg', date: 'Dec 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'Next.js', 'i18n'], link: 'https://github.com/rodgmont', body: 'A lightweight locale detection middleware for Next.js App Router that uses cookies and Accept-Language headers without pulling in heavy i18n libraries.' },
        { id: 'latam-nlp', title: 'LatAm NLP Datasets', subtitle: 'Curated NLP datasets for Latin American Spanish variants.', image: '/images/obelysk-hero.jpg', date: 'Nov 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'NLP', 'Data'], link: 'https://github.com/rodgmont', body: 'Curated and contributed datasets covering regional Spanish variants from El Salvador, Guatemala, and Mexico, designed for fine-tuning language models on local dialects.' },
      ],
    },
    {
      id: 'research',
      theme: 'Research',
      accent: '#8b5cf6',
      projects: [
        { id: 'slms-latam', title: 'SLMs for Latin America?', subtitle: 'Why smart language models are the right bet for the region.', image: '/images/sml-hero.jpg', date: 'May 2026', author: 'rodgmont', views: 1, shares: 0, tags: ['Research', 'AI', 'Ideas'], link: '/blog/smart-language-models', body: 'An analysis of how small language models can bridge the AI gap in Latin America, examining infrastructure constraints, language barriers, and economic realities.' },
        { id: 'cognitive-infrastructure', title: 'Cognitive Infrastructure', subtitle: 'Rethinking how intelligence is deployed in software systems.', image: '/images/obelysk-hero.jpg', date: 'Apr 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Research', 'Systems', 'AI'], link: '/blog/obelysk', body: 'A framework for thinking about intelligence as a foundational software layer rather than a feature, with implications for system design, latency, and organizational structure.' },
        { id: 'constraints-as-params', title: 'Constraints as Parameters', subtitle: 'How resource limitations sharpen system design thinking.', image: '/images/sml-hero.jpg', date: 'Mar 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Research', 'Engineering', 'Ideas'], link: '#', body: 'An essay on how operating under tight infrastructure constraints — as in El Salvador — produces more robust and thoughtful system design than operating with unlimited resources.' },
        { id: 'turing-gap', title: 'The Turing Gap', subtitle: 'Where we are on the path from LLMs to ASI.', image: '/images/obelysk-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Research', 'AI', 'Theory'], link: '#', body: 'A technical and philosophical exploration of the distance between current large language models and the artificial superintelligence Turing\'s original question implied.' },
      ],
    },
  ],
  es: [
    {
      id: 'ai',
      theme: 'Ingeniería de IA',
      accent: '#3b82f6',
      projects: [
        { id: 'obelysk', title: 'Obelysk', subtitle: 'Infraestructura cognitiva y SLMs para América Latina.', image: '/images/sml-hero.jpg', date: 'Mayo 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Ingeniería de IA', 'LLMOps'], link: 'https://www.obelysk.tech/', body: 'Arquitectura y desarrollo de la infraestructura central para desplegar modelos de lenguaje pequeños (SLMs) optimizados para entornos con recursos limitados en América Latina.' },
        { id: 'haiku', title: 'HAIKU', subtitle: 'Motor de aprendizaje adaptativo impulsado por IA.', image: '/images/obelysk-hero.jpg', date: 'Abr 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Machine Learning', 'EdTech'], link: '#', body: 'Una plataforma de aprendizaje adaptativo que combina pedagogía educativa con modelos de ML personalizados. Ajusta dinámicamente la dificultad del currículo en tiempo real.' },
        { id: 'slm-eval', title: 'SLM Eval Suite', subtitle: 'Framework de evaluación para SLMs en idiomas con pocos recursos.', image: '/images/sml-hero.jpg', date: 'Mar 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Investigación de IA', 'Evaluación'], link: '#', body: 'Un framework de benchmarking para evaluar modelos de lenguaje pequeños en español e idiomas indígenas de América Latina.' },
        { id: 'osi-proto', title: 'Prototipo OSI', subtitle: 'Investigación sobre arquitectura de Superinteligencia Orgánica.', image: '/images/obelysk-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Investigación', 'Sistemas'], link: '#', body: 'Trabajo teórico y experimental sobre la combinación de cognición artificial con encarnación robótica. Explorando bucles percepción-decisión-acción en entornos físicos.' },
        { id: 'inference-engine', title: 'Motor de Inferencia', subtitle: 'Runtime de inferencia optimizado para hardware en el borde.', image: '/images/sml-hero.jpg', date: 'Ene 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Sistemas', 'C++', 'ML'], link: '#', body: 'Un runtime de inferencia personalizado optimizado para ejecutar modelos transformer en hardware de borde con recursos limitados.' },
      ],
    },
    {
      id: 'engineering',
      theme: 'Ingeniería de Software',
      accent: '#f59e0b',
      projects: [
        { id: 'analytics-pipeline', title: 'Pipeline de Analítica', subtitle: 'Sistema de procesamiento de datos on-chain de alto rendimiento.', image: '/images/obelysk-hero.jpg', date: 'Mar 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Ingeniería de Datos', 'Go'], link: '#', body: 'Un pipeline de datos de alto rendimiento para procesar y analizar datos on-chain en tiempo real, con detección de anomalías basada en heurísticas.' },
        { id: 'api-gateway', title: 'API Gateway', subtitle: 'Reverse proxy de alto rendimiento con rate limiting y auth.', image: '/images/sml-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Backend', 'Go', 'Distribuido'], link: '#', body: 'Una API gateway de producción construida en Go con autenticación JWT, rate limiting por cliente y trazado de requests a través de microservicios.' },
        { id: 'redis-cache', title: 'Capa de Caché Distribuida', subtitle: 'Estrategia de caché Redis para salidas de modelos ML.', image: '/images/obelysk-hero.jpg', date: 'Ene 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Backend', 'Redis', 'Sistemas'], link: '#', body: 'Una capa de caché distribuida sobre Redis que almacena resultados de inferencia ML, reduciendo cómputo redundante en más del 90% para entradas idénticas.' },
        { id: 'blog-platform', title: 'Este Blog', subtitle: 'Plataforma de publicación personal con Next.js y MDX.', image: '/images/sml-hero.jpg', date: 'Dic 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['Next.js', 'MDX', 'Frontend'], link: 'https://franrodgmont.com', body: 'Un blog personal mínimo y rápido construido con Next.js App Router y MDX. Soporte bilingüe EN/ES, conteo de vistas con Redis y layout de artículo con scroll-spy.' },
        { id: 'cli-tools', title: 'Dev CLI Toolkit', subtitle: 'Utilidades de línea de comandos para flujos de trabajo de IA.', image: '/images/obelysk-hero.jpg', date: 'Nov 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['CLI', 'Python', 'Tooling'], link: 'https://github.com/rodgmont', body: 'Una colección de herramientas CLI para gestionar experimentos ML, parsear salidas de modelos y automatizar pasos de despliegue en pipelines de ingeniería de IA.' },
      ],
    },
    {
      id: 'opensource',
      theme: 'Open Source',
      accent: '#10b981',
      projects: [
        { id: 'ai-optimization', title: 'Optimización de Modelos de IA', subtitle: 'Herramientas de cuantización para modelos transformer.', image: '/images/sml-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'PyTorch'], link: 'https://github.com/rodgmont', body: 'Contribuciones a librerías open-source enfocadas en cuantización y fine-tuning de modelos transformer. Mejora de documentación y soporte para nuevas arquitecturas.' },
        { id: 'mdx-components', title: 'Librería de Componentes MDX', subtitle: 'Componentes React reutilizables para publicación con MDX.', image: '/images/obelysk-hero.jpg', date: 'Ene 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'React', 'MDX'], link: 'https://github.com/rodgmont', body: 'Un conjunto de componentes React accesibles y reutilizables para publicación de contenido con MDX, incluyendo scroll-spy, secciones de artículo y formato de citas.' },
        { id: 'nextjs-i18n', title: 'Middleware i18n Next.js', subtitle: 'Detección de idioma basada en cookies sin dependencias pesadas.', image: '/images/sml-hero.jpg', date: 'Dic 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'Next.js', 'i18n'], link: 'https://github.com/rodgmont', body: 'Un middleware ligero de detección de idioma para Next.js App Router que usa cookies y cabeceras Accept-Language sin librerías i18n pesadas.' },
        { id: 'latam-nlp', title: 'Datasets NLP LatAm', subtitle: 'Datasets NLP para variantes del español latinoamericano.', image: '/images/obelysk-hero.jpg', date: 'Nov 2025', author: 'rodgmont', views: 0, shares: 0, tags: ['Open Source', 'NLP', 'Datos'], link: 'https://github.com/rodgmont', body: 'Datasets curados que cubren variantes regionales del español de El Salvador, Guatemala y México, para fine-tuning de modelos de lenguaje en dialectos locales.' },
      ],
    },
    {
      id: 'research',
      theme: 'Investigaciones',
      accent: '#8b5cf6',
      projects: [
        { id: 'slms-latam', title: '¿SLMs para Latinoamérica?', subtitle: 'Por qué los SLMs son la apuesta correcta para la región.', image: '/images/sml-hero.jpg', date: 'Mayo 2026', author: 'rodgmont', views: 1, shares: 0, tags: ['Investigación', 'IA', 'Ideas'], link: '/es/blog/smart-language-models', body: 'Un análisis de cómo los modelos de lenguaje pequeños pueden cerrar la brecha de IA en América Latina, examinando las limitaciones de infraestructura, barreras lingüísticas y realidades económicas.' },
        { id: 'cognitive-infrastructure', title: 'Infraestructura Cognitiva', subtitle: 'Repensar cómo se despliega la inteligencia en el software.', image: '/images/obelysk-hero.jpg', date: 'Abr 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Investigación', 'Sistemas', 'IA'], link: '/es/blog/obelysk', body: 'Un framework para pensar la inteligencia como capa fundacional del software, con implicaciones para el diseño de sistemas, latencia y estructura organizacional.' },
        { id: 'constraints-as-params', title: 'Restricciones como Parámetros', subtitle: 'Cómo las limitaciones afinan el diseño de sistemas.', image: '/images/sml-hero.jpg', date: 'Mar 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Investigación', 'Ingeniería', 'Ideas'], link: '#', body: 'Un ensayo sobre cómo operar bajo restricciones de infraestructura severas produce un diseño de sistemas más robusto y reflexivo que operar con recursos ilimitados.' },
        { id: 'turing-gap', title: 'La Brecha de Turing', subtitle: 'Dónde estamos en el camino de los LLMs a la ASI.', image: '/images/obelysk-hero.jpg', date: 'Feb 2026', author: 'rodgmont', views: 0, shares: 0, tags: ['Investigación', 'IA', 'Teoría'], link: '#', body: 'Una exploración técnica y filosófica de la distancia entre los grandes modelos de lenguaje actuales y la superinteligencia artificial que la pregunta original de Turing implicaba.' },
      ],
    },
  ],
};

export function getPortfolioData(locale) {
  return PORTFOLIO_DATA[locale] ?? PORTFOLIO_DATA.en;
}
