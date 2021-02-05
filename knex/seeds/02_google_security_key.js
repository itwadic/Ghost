
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('google_security_keys').del()
    .then(function () {
      // Inserts seed entries
      return knex('google_security_keys').insert([
        {
          id: 1, 
          json_sec_key: JSON.stringify({
            "type": "service_account",
            "project_id": "printing-usa",
            "private_key_id": "45b1ea2b6057f09b0bd2cdadc367e9847806a84d",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDFhz4t1UjPiKT6\nxA0R+Vu4eGFDx1DgnT6/1qtGEa6N2T3VKAbpYkhF/0l01MpQDBlG6o63T9NxvGoR\nrM/Jid6J9exyC4VwPlifQ7ey9UVwWXX+og+9iLYm0g1QxZjQwuSBFbxVhDAxKLEu\nVW4ol/EyLSVs5hhzzBEGqLh0DvOafCoKc+GQ+SokLlJuP6F9rzDjoSMzQfFxdjMc\nkMnM9KxF1Qsh9sFLZkUM4mi6W05Tsrab3tznJsD8Uslu+QZrgGtDz1XsRwdTeRQf\nQKi1H441eeiIm5yPRRvxAjOmMSG1nkjXnpY2zB9frnnvCe3eCwEZKwf9f7JMl7/J\n72yiNRB1AgMBAAECggEABKA1aHUmV3pQg6n+mF1GQvHKUOOy1RGO/BUhdlxIwd+o\nNHzwCdUmnUF6sQT10UiHQFivbyblFt9W0zxAeeySE+8G/UtnHHrQaSmG7liExwFW\nqp8jawGouJp2Cgj777wUPvdsycqRfCGttzpmDpUWkUUHZFhCPav9Moe5p3KWMMJ/\nGEofOKHzCLP8hhbRUuMC/NRYb8p2WP7LHo/zTWR2ZkUqAly0wurICbDSMff/H+N4\n6qRBawvx+eGrOsGDSVtxfAqXJKpsN/GRjsB3WJ5+A/qvTuia3Hw25R8Pj2lMUCpU\n3BCVzCOByG6bk7Uutp2URnSOAscPpd/eZZUxbPeMAQKBgQDoNeTo2obFPZs0ND/a\nY0lQPWNNFvDztkm9+F9WqM6GAYxHwn2rZ4BW7ogTOjtj+kIZCcVFSo6X3PS7cGaU\n8a4At38sIAoypmWY3FRp3mmwXfbLlytaNoSELC4/9zINctplMTs+RwueimrAFXjE\n9VzLVmMQv+CB01lYOZjNjMQZdQKBgQDZw7/s5G++b/CZXhUA66zcw+6P8ICGPrfA\nxZs0Ys/pbfbWK6oV3EO8CX1JyROhfuhC/4da0+lCJx4wZTvUihCopXgEHTBuyw+1\nsu8VT1oTnvFphCmOWuh39yJ00ZpllOPH5SkBVu511aArHBFEAEx3GnjJveDpVcvO\nIDAW3+c7AQKBgQCKbd6JxgRDv0cv5toN+dRxxjbVdRCtaQUq/87uHXIIxxF2kgZS\n0T/cExUByVwwbLdMr9tvRFQfSjSHLSmqLy1Y9gsVJgCOU04Lw4V7G4EMB+ghVHwe\nqpNzK9digJ3REKALZT75EGdn2wJqgiJd4BuyiExEZu6S1ojTpHpoRzt8JQKBgQDC\nX1AzYZ9AS2hlbK2wuav9DcIlppUBvn+DyJ4FP2G3SNj3R9g0VPv8nje/oYQtNTqZ\ner3VW6srygDPT7z8tBO0hKXAflFZw1SNaV6wFbkgJFH1TetNzmULl4Kg5Oo8W46J\nQUm9kVudwAWMFSxwFxgpg25nHF3hyBv3K5HhCQ+7AQKBgQCmrS1KIQNNkh3qoIUD\nB/rMGIr3xe4BYIiqqywexCAOU5//TlfEn2G525Dd85xu/pV/kgZycFNULn8wU6k8\nLtT+p2L7eATy+xuyL/n3j6UT5Gu6B8YUgLgI3ABc4mNMu4Jtx0aNcwVDevV2swop\nyKdbbE/7N7Yib5hF+hBhlWrovg==\n-----END PRIVATE KEY-----\n",
            "client_email": "printingcenterusa@printing-usa.iam.gserviceaccount.com",
            "client_id": "115504458429993370251",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/printingcenterusa%40printing-usa.iam.gserviceaccount.com"
          }),
          status: true
      },
      
    ]);
    
  });
};
