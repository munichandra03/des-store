pipeline {
    
    options {
        preserveStashes(buildCount: 5)
        timestamps ()
    }
    agent {
        label 'des-slave91'
    }
    environment{
        TARGET_SERVER = "192.168.15.91"
        TARGET_USER = "des"
        APP_NAME = "des-storefront"
 
           
    }
    stages{
            
        stage("Build npm docker image and create artifact out of docker image") {
            steps {
                dir("${env.WORKSPACE}/source") {
                sh "npm install && npm run build && pm2 delete des-storefront && pm2 start yarn --name des-storefront -- start --port 14000"
                //    sh "npm install && next build && pm2 serve out 14000 --spa"
                }
            }
        }
                       
               
    }
    post {
        success {
            emailext (
                subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                 <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                to: "desadmin@logixal.com"
            )
        }
        failure {
           emailext (
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                  <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                to: "desadmin@logixal.com"
            )
        }
    }
}
