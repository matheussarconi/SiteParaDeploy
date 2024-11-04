<h1>Deploy do Aplicativo no GitHub</h1>

Este guia fornece um passo a passo sobre como realizar o deploy de um aplicativo usando o GitHub Pages diretamente pela interface web do GitHub. Você pode usar este método para hospedar sites estáticos ou aplicativos front-end.

<h2>Pré-requisitos</h2>

Antes de iniciar, verifique se você possui os seguintes itens:

<ul>
    <li>Conta no GitHub.</li>
    <li>Um aplicativo ou site pronto para ser hospedado.</li>
</ul>

<h2>Passo 1: Criar um Repositório no GitHub</h2>

<ul>
    <li>Acesse <a href="https://github.com">GitHub</a> e faça login na sua conta.</li>
    <li>Clique no botão <strong>+</strong> no canto superior direito e selecione <strong>New repository</strong>.</li>
    <li>Dê um nome ao seu repositório (exemplo: <code>meu-app</code>).</li>
    <li>Marque a opção <strong>Public</strong>.</li>
    <li>Clique em <strong>Create repository</strong>.</li>
</ul>

<h2>Passo 2: Carregar os Arquivos do Seu Projeto</h2>

<ul>
    <li>Na página do repositório recém-criado, clique no botão <strong>Add file</strong> e selecione <strong>Upload files</strong>.</li>
    <li>Arraste e solte os arquivos do seu projeto (HTML, CSS, JavaScript, imagens, etc.) na área designada ou clique em <strong>choose your files</strong> para selecionar os arquivos manualmente.</li>
    <li>Após adicionar todos os arquivos, role para baixo e clique em <strong>Commit changes</strong>.</li>
</ul>

<h2>Passo 3: Configurar GitHub Pages</h2>

<ul>
    <li>Com os arquivos do seu projeto carregados, vá para a aba <strong>Settings</strong> do seu repositório.</li>
    <li>No menu lateral esquerdo, clique em <strong>Pages</strong>.</li>
    <li>Em <strong>Source</strong>, selecione a branch que deseja usar para o GitHub Pages (geralmente <code>main</code>) e a pasta (seu diretório raiz ou uma pasta específica, como <code>/docs</code>).</li>
    <li>Clique em <strong>Save</strong>.</li>
</ul>

<h2>Passo 4: Acessar o Seu Aplicativo</h2>

Após alguns minutos, seu aplicativo estará disponível em:

<pre>
https://USERNAME.github.io/REPOSITORY/
</pre>

Substitua <code>USERNAME</code> e <code>REPOSITORY</code> pelos seus dados.

<h2>Problemas Comuns</h2>

<ul>
    <li><strong>Erro 404</strong>: Verifique se a branch correta está selecionada nas configurações do GitHub Pages.</li>
    <li><strong>Mudanças não refletidas</strong>: Limpe o cache do navegador ou verifique se os arquivos foram carregados corretamente.</li>
</ul>

<h2>Contribuição</h2>

Se você deseja contribuir para este projeto, siga estas etapas:

<ul>
    <li>Faça um fork deste repositório.</li>
    <li>Crie uma nova branch.</li>
    <li>Faça suas alterações e commit.</li>
    <li>Envie sua branch.</li>
    <li>Abra um pull request.</li>
</ul>

<h2>Licença</h2>

Este projeto está licenciado sob a <a href="LICENSE">MIT License</a>.
