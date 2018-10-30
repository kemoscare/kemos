import {Intent} from '@blueprintjs/core'

export const DISCONNECTED = {
    title: "Vous avez été déconnecté",
    content: "Veuillez vous reconnecter ci-dessous",
    intent: Intent.WARNING
}

export const WRONG_CREDENTIALS = {
    title: "Nom d'utilisateur ou mot de passe erroné",
    content: "Votre mot de passe ou nom d'utilisateur n'a pas permis de vous identifier",
    intent: Intent.DANGER
}