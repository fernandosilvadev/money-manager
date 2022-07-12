import { Container, Content } from './styles'

import logoImg from '../../assets/logo.svg'


interface HeaderProps {
    // this property is a function and the return value is empty. This function doesn't have any parameters and it doesn't return anything.
    onOpenNewTransactionModal: () => void;
}

// Destructuring the HeaderProps
export function Header({ onOpenNewTransactionModal }: HeaderProps) {

    return (
        <Container>
            <Content>
            <img src={logoImg} alt="dt money"/>
            <button type="button" onClick={onOpenNewTransactionModal}>
                Nova transação
            </button>




            </Content>
        </Container>
    )
}