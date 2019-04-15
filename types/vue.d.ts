import Vue from 'vue';
import { ModalService } from './index';

declare module 'vue/types/vue' {
    interface Vue {
        $dialogSvc: ModalService;
    }
}
