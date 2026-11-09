---
title: "Station de monitoring Arduino avec alertes"
summary: "Mesure de température et d'humidité, alertes à seuil et rapport quotidien avec valeurs critiques surlignées."
status: "en-cours"
startDate: "[AAAA-MM-JJ]" # remplace par la date réelle, sans guillemets : 2026-03-01
technologies: ["Arduino", "DHT22", "Python", "n8n", "Telegram", "Tinkercad", "KiCad"]
repoUrl: "https://github.com/[TON-COMPTE]/arduino-monitoring-station"
featured: true
---

## Contexte industriel
En industrie, un capteur qui dépasse un seuil doit déclencher une alerte et laisser une trace. Ce projet reproduit cette logique à petite échelle : acquisition, seuil, notification, rapport.

## Objectif
Construire une chaîne complète capteur → alerte → rapport, documentée comme un petit projet d'ingénierie.

## Matériel
Arduino Uno, capteur DHT22, 2 LED, buzzer piézo, résistances 220 Ω, breadboard.

## Schéma
[Capture Tinkercad + schéma KiCad exporté en PDF]

## Implémentation
1. Simulation de la logique de seuil dans Tinkercad.
2. Montage réel avec le DHT22 et envoi des mesures sur le port série.
3. Script Python qui lit le port série et transmet à un webhook n8n.
4. Workflow n8n : seuil, notification Telegram, rapport HTML quotidien.

## Résultats
[À REMPLIR APRÈS TES TESTS : nombre de mesures, temps de réponse de l'alerte, etc. Ne rien écrire avant d'avoir mesuré.]

## Leçons apprises
[À REMPLIR]

## Liens
Repo GitHub · Vidéo de démonstration [À AJOUTER]
