pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nguyentranphuquy/mmtnc-23127113-23127296:${env.BUILD_ID}"
        REGISTRY_CREDS = "mmtnc_23127113_23127296"
        CI = "true"
    }

    stages {
        stage('Run Integration Test') {
            steps {
                script {
                    echo "Starting Test Environment..."
                    sh "docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from sut"
                }
            }
        }

        stage('Build Production Image') {
            steps {
                script {
                    echo "Tests passed. Building optimized Nginx image..."
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${env.REGISTRY_CREDS}", passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying"
                    sh "docker pull ${DOCKER_IMAGE}"
        
                    sh "docker stop demo-site || true"
                    sh "docker rm demo-site || true"

                    sh "docker run -d --restart unless-stopped -p 80:80 --name demo-site ${DOCKER_IMAGE}"
                }
            }
        }
    }

post {
        always {
            sh "docker-compose -f docker-compose.test.yml down --rmi local --volumes"
        }
        
        success {
            script {
                try {
                    step([$class: 'GitHubCommitStatusSetter',
                          reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/nguyentranphuquy/mmtnc-23127113-23127296'],
                          statusResultSource: [$class: 'ConditionalStatusResultSource', results: [
                              [$class: 'BetterThanOrEqualBuildResult', result: 'SUCCESS', state: 'SUCCESS', message: 'Jenkins Build Passed']
                          ]]
                    ])
                } catch (Exception e) {
                    echo "Warning: Could not send status to GitHub. Check credentials/plugins."
                }
            }
        }

        failure {
            script {
                try {
                    step([$class: 'GitHubCommitStatusSetter',
                          reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/nguyentranphuquy/mmtnc-23127113-23127296'],
                          statusResultSource: [$class: 'ConditionalStatusResultSource', results: [
                              [$class: 'AnyBuildResult', state: 'FAILURE', message: 'Jenkins Build Failed']
                          ]]
                    ])
                } catch (Exception e) {
                    echo "Warning: Could not send status to GitHub."
                }
            }
        }
    }
}