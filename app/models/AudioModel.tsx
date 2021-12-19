
class AudioModel {
    uri: string
    type: string
    name: string
    constructor(data: { uri: string; name: string; }) {
        if (data === null) {
            return;
        }
        this.uri = data?.uri;
        this.type = 'audio/wav'
        this.name = data?.name


    }



}

export default AudioModel